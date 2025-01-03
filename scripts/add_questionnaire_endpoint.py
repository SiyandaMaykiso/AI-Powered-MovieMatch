from fastapi import FastAPI, HTTPException
import pandas as pd

app = FastAPI()

# Path to the questionnaire movies file
questionnaire_path = "/Users/siyandamayekiso/Documents/2024 React PostgreSQL Projects/AI-Powered MovieMatch/data/ml-latest-small/questionnaire_movies.csv"

@app.get("/questionnaire")
def get_questionnaire():
    try:
        # Load the questionnaire data
        print("Loading questionnaire movies...")
        questionnaire = pd.read_csv(questionnaire_path)
        
        # Return the complete questionnaire
        movies_to_rate = questionnaire[["movie_id", "title", "genres"]].to_dict(orient="records")
        print("Questionnaire loaded successfully!")
        return {"movies": movies_to_rate}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading questionnaire: {str(e)}")