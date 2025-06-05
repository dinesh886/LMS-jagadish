import React, { useState, useRef, useEffect } from "react";
import "./MCQModal.css";
import { FaPlus } from "react-icons/fa";
import 'katex/dist/katex.min.css';
import LatexRenderer, { cleanLatex } from "../../../ReusableComponents/LatexRenderer/LatexRenderer";
import useBounceModal from "../../../ReusableComponents/useBounceModal/useBounceModal";

const MCQModal = ({ open, onClose }) => {
    const { modalRef, isBouncing } = useBounceModal(open);
    const [questionTitle, setQuestionTitle] = useState("");
    const [answers, setAnswers] = useState([{ text: "", image: null }]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [isCodeEnabled, setIsCodeEnabled] = useState(false);
    const [isLaTeXEnabled, setIsLaTeXEnabled] = useState(false);
    const [latexError, setLatexError] = useState(null);

    const handleCodeToggle = () => {
        const newValue = !isCodeEnabled;
        setIsCodeEnabled(newValue);
        if (newValue) {
            setIsLaTeXEnabled(false); // Disable LaTeX if Code is now enabled
        }
    };

    const handleLaTeXToggle = () => {
        const newValue = !isLaTeXEnabled;
        setIsLaTeXEnabled(newValue);
        if (newValue) {
            setIsCodeEnabled(false); // Disable Code if LaTeX is now enabled
        }
    };


    const addAnswerField = () => {
        setAnswers([...answers, { text: "", image: null }]);
    };

    const handleAnswerChange = (index, field, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index][field] = value;
        setAnswers(updatedAnswers);
    };

    const handleImageUpload = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleAnswerChange(index, "image", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log({
            questionTitle,
            answers,
            correctAnswer,
            isCodeEnabled,
            isLaTeXEnabled,
        });
        onClose();
    };


    // Clean LaTeX input when toggling
    useEffect(() => {
        if (!isLaTeXEnabled) {
            setQuestionTitle(prev => cleanLatex(prev));
            setAnswers(prev => prev.map(answer => ({
                ...answer,
                text: cleanLatex(answer.text)
            })));
        }
    }, [isLaTeXEnabled]);

    if (!open) return null;

    return (
        <div className="mcq-modal-overlay">
            <div ref={modalRef} className={`mcq-modal-content ${isBouncing ? "bounce" : ""}`}>
                <div className="mcq-modal-header">
                    <h5>Add MCQ Question</h5>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="mcq-modal-body">
                    <div className="mcq-row">
                        <div className="first-column">
                            <div className="switch-container">
                                <div className="switch-wrapper">
                                    <label>Enable Code</label>
                                    <label className="switch">

                                        <input
                                            type="checkbox"
                                            checked={isCodeEnabled}
                                            onChange={handleCodeToggle}
                                        />

                                        <span className="slider round"></span>
                                    </label>
                                </div>

                                <div className="switch-wrapper">
                                    <label>Enable LaTeX</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={isLaTeXEnabled}
                                            onChange={handleLaTeXToggle}
                                        />
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="mcq-form-group">
                                <label className="pt-3">Question : </label>
                                {isLaTeXEnabled ? (
                                    <>
                                        <textarea
                                            className="mcq-form-control latex-input"
                                            rows="4"
                                            value={questionTitle}
                                            onChange={(e) => setQuestionTitle(e.target.value)}
                                            placeholder="Enter content (supports LaTeX with \(...\) and HTML tags)"
                                        />
                                        {/* <div className="latex-preview">
                                                <h6>LaTeX Preview:</h6>
                                                {renderLatex(questionTitle)}
                                            </div> */}
                                    </>
                                ) : (
                                    <input
                                        type="text"
                                        className="mcq-form-control"
                                        value={questionTitle}
                                        onChange={(e) => setQuestionTitle(e.target.value)}
                                        placeholder="Enter question text"
                                    />
                                )}
                            </div>

                            {answers.map((answer, index) => (
                                <div className="mcq-form-group" key={index}>
                                    <label>Answer {index + 1}</label>
                                    {isLaTeXEnabled ? (
                                        <>
                                            <textarea
                                                className="mcq-form-control latex-input"
                                                value={answer.text}
                                                onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                                                placeholder="Enter LaTeX equation"
                                            />
                                            {/* <div className="latex-preview">
                                                    <h6>Preview:</h6>
                                                    {renderLatex(answer.text)}
                                                </div> */}
                                        </>
                                    ) : (
                                        <input
                                            type="text"
                                            className="mcq-form-control"
                                            value={answer.text}
                                            onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
                                            placeholder="Enter answer text"
                                        />
                                    )}
                                    <input
                                        type="file"
                                        className="mcq-form-control mt-2"
                                        onChange={(e) => handleImageUpload(e, index)}
                                        accept="image/*"
                                    />
                                    {answer.image && (
                                        <div className="image-preview-container">
                                            <img
                                                src={answer.image}
                                                alt={`Answer ${index + 1} preview`}
                                                className="img-preview-small"
                                            />
                                            <button
                                                className="btn-remove-image"
                                                onClick={() => handleAnswerChange(index, "image", null)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}

                            <button className="btn-add-answer" onClick={addAnswerField}>
                                <span><FaPlus className="icon" /></span> Add Answer
                            </button>

                            <div className="mcq-form-group">
                                <label>Correct Answer</label>
                                <select
                                    className="mcq-form-control"
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    required
                                >
                                    <option value="">Select Correct Answer</option>
                                    {answers.map((_, index) => (
                                        <option key={index} value={`answer${index + 1}`}>
                                            Answer {index + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="secound-column">
                            <div className="Mcqpreview-section">
                                <h6>Live Preview</h6>
                                <div className="preview-question">
                                    <strong>Question:</strong>
                                    <div className="preview-content">
                                        {isLaTeXEnabled ? (
                                            <LatexRenderer content={questionTitle} />
                                        ) : (
                                            questionTitle || <span className="placeholder-text">No question added yet.</span>
                                        )}
                                    </div>
                                </div>
                                <div className="preview-answers">
                                    <strong>Answers:</strong>
                                    {answers.map((answer, index) => (
                                        <div className={`answer ${correctAnswer === `answer${index + 1}` ? 'correct-answer' : ''}`} key={index}>
                                            <div className="answer-number">Answer {index + 1}:</div>
                                            <div className="answer-content">
                                                {isLaTeXEnabled ? (
                                                    <LatexRenderer content={answer.text} />
                                                ) : (
                                                    answer.text || <span className="placeholder-text">Empty answer</span>
                                                )}
                                                {answer.image && (
                                                    <img
                                                        src={answer.image}
                                                        alt={`Answer ${index + 1}`}
                                                        className="img-preview"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="preview-correct-answer">
                                    <strong>Correct Answer:</strong>
                                    {correctAnswer ? (
                                        <span className="correct-answer-label">{correctAnswer.replace('answer', 'Answer ')}</span>
                                    ) : (
                                        <span className="placeholder-text">Not selected yet.</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mcq-modal-footer">
                    <button className="btn btn-cancel" onClick={onClose}>Close</button>
                    <button className="btn btn-save" onClick={handleSubmit}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default MCQModal;