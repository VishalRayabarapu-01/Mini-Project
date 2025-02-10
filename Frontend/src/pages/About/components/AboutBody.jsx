import React from "react";

export default function AboutBody() {
  return (
    <div className="container mt-5 mb-5">
      <div class="card">
        <div class="card-header">Dog-Breed-Prediction</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>
              The Dog Breed Prediction Web Application is a full-stack web
              application developed to accurately predict the breed of a dog
              from an uploaded image. It combines the power of deep learning
              algorithms, specifically InceptionV3 and Xception models, with a
              user-friendly frontend built using React.js, HTML, CSS, and
              Bootstrap, and a robust backend powered by Django.
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
