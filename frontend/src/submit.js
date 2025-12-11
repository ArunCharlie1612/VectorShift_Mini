// submit.js

export const SubmitButton = () => {
    return (
        <div className="submit-container">
            <button type="submit" className="submit-button" aria-label="Submit">
                <span className="icon" aria-hidden>
                    {/* small check / send icon */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12L22 3L11 22L9 13L2 12Z" fill="white" opacity="0.98"/>
                    </svg>
                </span>
                <span>Submit</span>
            </button>
        </div>
    );
}

export default SubmitButton;
