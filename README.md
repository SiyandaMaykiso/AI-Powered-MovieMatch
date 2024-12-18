# AI-Powered MovieMatch 

AI-Powered MovieMatch is a web application that recommends movies tailored to user preferences using **machine learning algorithms**. The project combines collaborative and content-based filtering techniques to provide personalized movie suggestions. Built with **React.js** for the frontend, **Node.js** for the backend, and **PostgreSQL** hosted on Heroku, this project is a showcase of modern web development integrated with machine learning.

---

## Features

### **Core Functionality**
1. **Personalized Movie Recommendations**:  
   - Uses machine learning to analyze user preferences and suggest movies dynamically.
2. **User Authentication**:  
   - Secure login and registration using JWT.
3. **Interactive User Experience**:  
   - Rate movies and see recommendations update in real-time.
4. **Recommendation History**:  
   - Save and view past recommendations.

---

## **Machine Learning Aspect**

AI-Powered MovieMatch leverages **machine learning algorithms** to create a powerful recommendation system:

### **1. Collaborative Filtering**  
- **What it does**:  
   - Analyzes user ratings to find patterns between users and their movie preferences.
- **Algorithm used**:  
   - Matrix factorization with **Singular Value Decomposition (SVD)**.

### **2. Content-Based Filtering**  
- **What it does**:  
   - Recommends movies similar to those a user has liked, based on metadata (genres, actors, etc.).
- **Algorithm used**:  
   - Cosine similarity on movie metadata.

### **3. Hybrid Recommendation System**  
- **What it does**:  
   - Combines collaborative filtering and content-based filtering to improve accuracy and personalization.

### **Dataset**  
- **Source**: MovieLens Dataset.  
- **Data**: Includes user ratings, movie genres, and metadata for robust training.

---

## **Tech Stack**

### **Frontend**  
- React.js  
- Axios  
- React Router

### **Backend**  
- Node.js  
- Express.js  
- Flask (for serving the ML model)  

### **Database**  
- PostgreSQL (hosted on Heroku)  

### **Machine Learning**  
- Python with **scikit-learn**, **pandas**, and **Flask**.

---

## **How It Works**

1. **Data Input**:  
   - Users rate movies or input their preferences.  

2. **Model Training**:  
   - The ML models analyze the dataset and user interactions to generate recommendations.  

3. **API Integration**:  
   - The trained models are hosted via Flask and integrated into the backend using RESTful APIs.

4. **Recommendations Displayed**:  
   - The frontend dynamically displays recommendations using React components.

---

## **Setup Instructions**

### Prerequisites:
- Node.js and npm
- Python 3.8+
- PostgreSQL
- Heroku CLI