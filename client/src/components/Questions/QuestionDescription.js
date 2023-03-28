
import React, { useState } from 'react'
import QuestionEditor from '../Editor/QuestionEditor';

const QuestionDescription = () => {

    const [answer, setAnswer] = useState();

    const submitHandler = () => {

    }

  return (
    <div>
        {/* Here question details */}

        <QuestionEditor onEdit = {setAnswer}/>
    </div>
  )
}

export default QuestionDescription