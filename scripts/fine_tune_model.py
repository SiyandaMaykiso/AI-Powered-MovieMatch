from surprise import SVD, Dataset, Reader
from surprise.model_selection import GridSearchCV
import pandas as pd
import pickle

# Load user-movie interaction matrix
print("Loading user-movie interaction matrix...")
file_path = "../data/ml-latest-small/user_movie_matrix.csv"
interaction_matrix = pd.read_csv(file_path)

# Transform the dataset from wide to long format
print("Transforming the dataset...")
interaction_long = interaction_matrix.melt(
    id_vars=["user_id"], 
    var_name="movieId", 
    value_name="rating"
)

# Drop rows with NaN or invalid ratings
interaction_long = interaction_long.dropna(subset=["rating"])

# Rename columns to match expected format
interaction_long.rename(columns={"user_id": "userId"}, inplace=True)

# Define the reader format
reader = Reader(rating_scale=(1, 5))

# Load data into Surprise's Dataset format
print("Loading data into Surprise's Dataset format...")
data = Dataset.load_from_df(interaction_long[["userId", "movieId", "rating"]], reader)

# Define parameter grid for SVD
param_grid = {
    'n_factors': [50, 100, 150],
    'n_epochs': [20, 30, 40],
    'lr_all': [0.002, 0.005],
    'reg_all': [0.02, 0.1, 0.4]
}

# Perform grid search
print("Performing grid search for hyperparameter optimization...")
gs = GridSearchCV(SVD, param_grid, measures=['rmse', 'mae'], cv=5)
gs.fit(data)

# Output best score and parameters
print("Best RMSE: ", gs.best_score['rmse'])
print("Best hyperparameters: ", gs.best_params['rmse'])

# Save the best model for later use
best_model = gs.best_estimator['rmse']

# Train and evaluate the best model on the entire dataset
print("Training the best model on the full dataset...")
trainset = data.build_full_trainset()
best_model.fit(trainset)

# Save the trained model to a file
model_path = "../models/best_svd_model.pkl"
print(f"Saving the best model to {model_path}...")
with open(model_path, "wb") as model_file:
    pickle.dump(best_model, model_file)

print("Fine-tuning and optimization complete!")