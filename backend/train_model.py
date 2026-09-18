"""
AI Odyssey: Machine Learning Explorer
======================================
Production Training Pipeline with MLflow Tracking & Model Registry Integration

This script:
1. Generates a reproducible, high-signal student performance dataset.
2. Trains a Scikit-Learn RandomForestClassifier and LinearRegressor.
3. Automatically logs hyperparameters, dataset splits, and metrics (MSE, R2, ROC-AUC) to MLflow.
4. Saves artifacts (feature importances, evaluation reports) and registers the model in the MLflow Model Registry.
5. Exports a production-ready model artifact (model.pkl) for high-speed local serving.
"""

import os
import json
import logging
from typing import Tuple, Dict, Any
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.metrics import (
    mean_squared_error,
    r2_score,
    mean_absolute_error,
    roc_auc_score,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report
)
import joblib

# Setup basic logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("train_model")

# Attempt MLflow import
try:
    import mlflow
    import mlflow.sklearn
    from mlflow.models.signature import infer_signature
    MLFLOW_AVAILABLE = True
except ImportError:
    MLFLOW_AVAILABLE = False
    logger.warning("MLflow not installed in active environment. Proceeding with local artifact export.")


def generate_dataset(n_samples: int = 1500, random_seed: int = 42) -> Tuple[pd.DataFrame, pd.Series, pd.Series]:
    """
    Generates a realistic student academic dataset with engineered correlation signals.
    Features:
      - hours_studied (float): 0.5 to 14.0 hours/day
      - attendance_pct (float): 50.0% to 100.0%
      - prep_tests (int): 0 to 10 completed practice exams
    Targets:
      - continuous_score: Exam score out of 100
      - binary_label: 1 (Pass / High Performance), 0 (Needs Support)
    """
    np.random.seed(random_seed)

    hours = np.random.uniform(0.5, 14.0, n_samples)
    attendance = np.random.uniform(55.0, 100.0, n_samples)
    prep_tests = np.random.randint(0, 9, n_samples)

    # Underlying physical data generating function with slight non-linear interaction + noise
    base_score = (
        15.0 
        + 4.8 * hours 
        + 0.35 * attendance 
        + 2.8 * prep_tests 
        + 0.08 * (hours * prep_tests) 
        + np.random.normal(0, 3.5, n_samples)
    )
    continuous_score = np.clip(base_score, 0.0, 100.0)

    # Classification label: Pass threshold >= 60%
    binary_label = (continuous_score >= 60.0).astype(int)

    X = pd.DataFrame({
        "hours_studied": np.round(hours, 2),
        "attendance_pct": np.round(attendance, 1),
        "prep_tests": prep_tests
    })

    return X, pd.Series(continuous_score, name="exam_score"), pd.Series(binary_label, name="pass_label")


def train_and_evaluate():
    """
    Executes the complete ML training pipeline with MLflow tracking and artifact serialization.
    """
    logger.info("Step 1/5: Synthesizing student performance dataset...")
    X, y_reg, y_clf = generate_dataset(n_samples=1500, random_seed=42)

    # 80/20 Stratified Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_clf, test_size=0.20, random_state=42, stratify=y_clf
    )
    y_reg_train, y_reg_test = y_reg.iloc[X_train.index], y_reg.iloc[X_test.index]

    logger.info(f"Dataset split completed. Training samples: {len(X_train)}, Test samples: {len(X_test)}")

    # Model Hyperparameters
    params = {
        "n_estimators": 120,
        "max_depth": 6,
        "min_samples_split": 4,
        "min_samples_leaf": 2,
        "criterion": "gini",
        "random_state": 42
    }

    # Setup MLflow Experiment
    experiment_name = "ai-odyssey-student-performance"
    if MLFLOW_AVAILABLE:
        mlflow.set_experiment(experiment_name)
        active_run = mlflow.start_run(run_name="random_forest_v1_prod")
        run_id = active_run.info.run_id
        logger.info(f"MLflow Active Run ID: {run_id}")
    else:
        run_id = "local-standalone-run"

    try:
        # Step 2: Fit RandomForest Classifier
        logger.info("Step 2/5: Fitting Random Forest Classifier...")
        clf = RandomForestClassifier(**params)
        clf.fit(X_train, y_train)

        # Step 3: Compute Classification Metrics
        logger.info("Step 3/5: Evaluating model performance on test set...")
        y_pred = clf.predict(X_test)
        y_prob = clf.predict_proba(X_test)[:, 1]

        acc = float(accuracy_score(y_test, y_pred))
        prec = float(precision_score(y_test, y_pred))
        rec = float(recall_score(y_test, y_pred))
        f1 = float(f1_score(y_test, y_pred))
        roc_auc = float(roc_auc_score(y_test, y_prob))

        # Regression baseline on continuous target
        reg = LinearRegression()
        reg.fit(X_train, y_reg_train)
        y_reg_pred = reg.predict(X_test)

        mse = float(mean_squared_error(y_reg_test, y_reg_pred))
        rmse = float(np.sqrt(mse))
        mae = float(mean_absolute_error(y_reg_test, y_reg_pred))
        r2 = float(r2_score(y_reg_test, y_reg_pred))

        metrics = {
            "test_accuracy": acc,
            "test_precision": prec,
            "test_recall": rec,
            "test_f1_score": f1,
            "test_roc_auc": roc_auc,
            "linear_regression_mse": mse,
            "linear_regression_rmse": rmse,
            "linear_regression_mae": mae,
            "linear_regression_r2": r2
        }

        logger.info("=" * 60)
        logger.info(f"Evaluation Metrics Summary:")
        logger.info(f"  Accuracy : {acc * 100:.2f}% | ROC-AUC : {roc_auc:.4f}")
        logger.info(f"  Precision: {prec:.4f} | Recall: {rec:.4f} | F1: {f1:.4f}")
        logger.info(f"  Regression MSE: {mse:.2f} | RMSE: {rmse:.2f} | R²: {r2 * 100:.2f}%")
        logger.info("=" * 60)

        # Step 4: MLflow Logging
        if MLFLOW_AVAILABLE:
            logger.info("Step 4/5: Logging parameters, metrics & artifacts to MLflow...")
            mlflow.log_params(params)
            mlflow.log_param("n_train_samples", len(X_train))
            mlflow.log_param("n_test_samples", len(X_test))
            mlflow.log_metrics(metrics)

            # Feature Importance
            feature_importances = dict(zip(X.columns, clf.feature_importances_.tolist()))
            report_artifact = {
                "experiment": experiment_name,
                "run_id": run_id,
                "hyperparameters": params,
                "metrics": metrics,
                "feature_importances": feature_importances,
                "classification_report": classification_report(y_test, y_pred, output_dict=True)
            }

            os.makedirs("artifacts", exist_ok=True)
            report_path = "artifacts/evaluation_report.json"
            with open(report_path, "w") as f:
                json.dump(report_artifact, f, indent=2)

            mlflow.log_artifact(report_path)

            # Infer Model Signature
            signature = infer_signature(X_train, clf.predict(X_train))

            # Log and Register Model in MLflow Model Registry
            mlflow.sklearn.log_model(
                sk_model=clf,
                artifact_path="student_performance_classifier",
                signature=signature,
                registered_model_name="StudentPerformanceClassifier"
            )
            logger.info("Model registered in MLflow Model Registry as 'StudentPerformanceClassifier'.")

        # Step 5: Export Local model.pkl artifact for FastAPI inference
        logger.info("Step 5/5: Exporting local model.pkl artifact for low-latency FastAPI inference...")
        model_payload = {
            "classifier": clf,
            "regressor": reg,
            "feature_names": list(X.columns),
            "metrics": metrics,
            "version": "v1.2.0-rf120",
            "mlflow_run_id": run_id
        }

        output_dir = os.path.dirname(os.path.abspath(__file__))
        model_file = os.path.join(output_dir, "model.pkl")
        joblib.dump(model_payload, model_file)
        logger.info(f"Model artifact successfully saved to: {model_file}")
        logger.info("Training and MLOps registration pipeline finished successfully!")

    finally:
        if MLFLOW_AVAILABLE:
            mlflow.end_run()


if __name__ == "__main__":
    train_and_evaluate()
