import pandas as pd  # For data manipulation
from surprise import SVD, Dataset, Reader
from surprise.model_selection import cross_validate, train_test_split
import pickle  # For saving the trained model

# Path to your combined dataset
dataset_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/user_movie_table.csv"

# Step 1: Load the dataset
print("Loading user-movie dataset...")
data = pd.read_csv(dataset_path)
print("Data loaded successfully!")

# Step 2: Define the schema for scikit-surprise
reader = Reader(rating_scale=(0.5, 5.0))  # Adjust if your ratings differ
print("Defining data schema...")
surprise_data = Dataset.load_from_df(data[["user_id", "movie_id", "rating"]], reader)
print("Data schema defined successfully!")

# Step 3: Split the data into training and validation sets
print("Splitting data into training and validation sets...")
trainset, testset = train_test_split(surprise_data, test_size=0.2)
print("Data split complete!")

# Step 4: Train the SVD model
print("Training the SVD model...")
model = SVD()  # Default parameters; can be fine-tuned later
model.fit(trainset)
print("Model training complete!")

# Step 5: Evaluate the model using cross-validation
print("Evaluating model using cross-validation...")
cv_results = cross_validate(model, surprise_data, measures=["RMSE", "MAE"], cv=5, verbose=True)

# Debugging: Display cross-validation results
print("Cross-validation results:")
for measure, values in cv_results.items():
    print(f"{measure}: {values}")

# Step 6: Save the trained model for future use (optional)
model_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/models/trained_svd_model.pkl"
print(f"Saving the trained model to {model_path}...")
with open(model_path, "wb") as file:
    pickle.dump(model, file)
print("Model saved successfully!")

print("Training and evaluation process completed!")