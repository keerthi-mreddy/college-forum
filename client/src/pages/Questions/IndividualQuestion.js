import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Axios from 'axios';
import { Navbar } from "../../components/Navbar/Navbar";
import QuestionDescription from "../../components/Questions/QuestionDescription";

const IndividualQuestion = () => {
	const {id} = useParams();
    
    const [questionDetails, setQuestionDetails] = useState({});

    useEffect(() => {
        const getQuestionDetails = async () => {
            const response = await Axios.get(`http://localhost:5000/questions/${id}`);
            console.log(response);
            setQuestionDetails(response.data[0]);
        } 
        getQuestionDetails();
    }, [])

    return <div>
        <Navbar />
        <QuestionDescription />
    </div>;
};

export default IndividualQuestion;
