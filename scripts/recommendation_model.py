import pandas as pd
from surprise import SVD, Dataset, Reader
from surprise.model_selection import cross_validate

# Load the interaction matrix
print("Loading user-movie interaction matrix...")
file_path = '../data/ml-latest-small/user_movie_matrix.csv'  # Adjust the path as needed
interaction_matrix = pd.read_csv(file_path, index_col=0)

# Transform the interaction matrix to a Surprise-compatible dataset
print("Transforming the interaction matrix...")
interaction_matrix = interaction_matrix.stack().reset_index()
interaction_matrix.columns = ['user_id', 'movie_id', 'rating']

# Define a Surprise Reader to handle the dataset
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(interaction_matrix[['user_id', 'movie_id', 'rating']], reader)

# Train the SVD model
print("Training the SVD model...")
svd = SVD()
cross_validate(svd, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)

# Predict ratings for specific user-movie pairs
print("\nTesting predictions...")
svd.fit(data.build_full_trainset())
test_cases = [(1, 1076), (2, 3338), (3, 4051)]  # Example user-movie pairs
for user_id, movie_id in test_cases:
    prediction = svd.predict(user_id, movie_id)
    print(f"Prediction for User {user_id}, Movie {movie_id}: {prediction.est:.2f}")