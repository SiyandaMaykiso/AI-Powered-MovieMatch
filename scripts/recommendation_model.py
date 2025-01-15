import pandas as pd
from surprise import SVD, Dataset, Reader
from surprise.model_selection import cross_validate
import pickle

# Load the interaction matrix
print("Loading user-movie interaction data...")
file_path = '/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/New_Cleaned_User-Movie_Table.csv'  # Update path if necessary
interaction_matrix = pd.read_csv(file_path)

# Ensure the data has the required columns
required_columns = {'user_id', 'movie_id', 'rating'}
if not required_columns.issubset(interaction_matrix.columns):
    raise ValueError(f"Dataset must contain the columns: {required_columns}")

# Define a Surprise Reader to handle the dataset
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(interaction_matrix[['user_id', 'movie_id', 'rating']], reader)

# Train the SVD model
print("Training the SVD model...")
svd = SVD()
cross_validate(svd, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

# Fit the model on the full dataset
print("Fitting the model on the full dataset...")
trainset = data.build_full_trainset()
svd.fit(trainset)

# Save the trained model to a file
model_path = "../models/trained_svd_model.pkl"  # Adjust path as needed
print(f"Saving the trained model to {model_path}...")
with open(model_path, "wb") as file:
    pickle.dump(svd, file)

print("Model training and saving completed!")