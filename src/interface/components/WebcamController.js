import React, { useEffect, useReducer, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { nextFrame } from "@tensorflow/tfjs";
import * as fp from "fingerpose";
import { Path } from "three";

const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
};


const WebcamController = ({ onFingerCount }) => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const runHandpose = async () => {
        const nn = await handpose.load();
        setInterval(() => detect(nn), 100);
    };

    const getFingerUpCount = async (predictions) => {
        if (predictions.length === 0) {
            return -1;
        }
        const GE = new fp.GestureEstimator([]);
        const gesture = await GE.estimate(predictions[0].landmarks, 8);
        let count = 0;
        for (let fingerPose of gesture.poseData) {
            if (fingerPose[1] === "No Curl") {
                count++;
            }
        }
        return count;
    };

    const drawHand = (predictions, ctx) => {
        // Check if we have predictions
        if (predictions.length > 0) {
          // Loop through each prediction
          predictions.forEach((prediction) => {
            // Grab landmarks
            const landmarks = prediction.landmarks;
      
            // Loop through fingers
            for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
              let finger = Object.keys(fingerJoints)[j];
              //  Loop through pairs of joints
              for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
                // Get pairs of joints
                const firstJointIndex = fingerJoints[finger][k];
                const secondJointIndex = fingerJoints[finger][k + 1];
      
                // Draw path
                ctx.beginPath();
                ctx.moveTo(
                  landmarks[firstJointIndex][0],
                  landmarks[firstJointIndex][1]
                );
                ctx.lineTo(
                  landmarks[secondJointIndex][0],
                  landmarks[secondJointIndex][1]
                );
                ctx.strokeStyle = "plum";
                ctx.lineWidth = 4;
                ctx.stroke();
              }
            }
      
            // Loop through landmarks and draw em
            for (let i = 0; i < landmarks.length; i++) {
              // Get x point
              const x = landmarks[i][0];
              // Get y point
              const y = landmarks[i][1];
              // Start drawing
              ctx.beginPath();
              ctx.arc(x, y, 5, 0, 3 * Math.PI);
      
              // Set line color
              ctx.fillStyle = "indigo";
              ctx.fill();
            }
          });
        }
      };

    const detect = async (nn) => {
        if (typeof webcamRef.current !=="undefined" 
        && webcamRef.current !== null 
        && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // video props
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
            
            // canvas props
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            
            const hand = await nn.estimateHands(video);

            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
            const fingerCount = await getFingerUpCount(hand);
            onFingerCount(fingerCount);
        }
    };

    useEffect(runHandpose, []);

    return (
        <>
            <Webcam 
                ref={webcamRef}
                style={{
                    position:"absolute",
                    top: 8,
                    right: 16,
                    width: 320,
                    height: 240,
                }}
            />
            <canvas 
                ref={canvasRef}
                style={{
                    position:"absolute",
                    top: 8,
                    right: 16,
                    width: 320,
                    height: 240
                }}
            />
        </>
    );

}

export default WebcamController;