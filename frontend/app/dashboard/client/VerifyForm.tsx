import React, { useState } from 'react';

const primaryColor = '#2b6369';
const hoverColor = '#224f54';

const styles = {
    pageContainer: {
        display: 'flex',
        justifyContent: 'flex-start',  // Move to top
        alignItems: 'flex-start',
        height: '100vh',
        paddingTop: '60px',            // Add top padding
    },
    formContainer: {
        maxWidth: '500px',
        width: '100%',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif' as const,
    },
    field: {
        display: 'flex',
        flexDirection: 'column' as const,
        marginBottom: '20px',
    },
    label: {
        marginBottom: '8px',
        fontWeight: 600,
        color: primaryColor,
    },
    input: {
        padding: '10px',
        border: `1px solid ${primaryColor}`,
        borderRadius: '4px',
        fontSize: '16px',
    },
    textarea: {
        padding: '10px',
        border: `1px solid ${primaryColor}`,
        borderRadius: '4px',
        fontSize: '16px',
        resize: 'vertical' as const,
        minHeight: '100px',
    },
    fileInput: {
        padding: '6px 0',
        fontSize: '14px',
        color: primaryColor,
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: primaryColor,
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

const VerifyForm: React.FC = () => {
    const [hourlyRate, setHourlyRate] = useState('');
    const [description, setDescription] = useState('');
    const [idFile, setIdFile] = useState<File | null>(null);
    const [educationProofFile, setEducationProofFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange =
        (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                setter(event.target.files[0]);
            }
        };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('hourlyRate', hourlyRate);
            formData.append('description', description);
            if (idFile) formData.append('idFile', idFile);
            if (educationProofFile) formData.append('educationProofFile', educationProofFile);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upgrade-to-psychologist`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit form');
            }

            setHourlyRate('');
            setDescription('');
            setIdFile(null);
            setEducationProofFile(null);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.pageContainer}>
            <form style={styles.formContainer} onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ margin: 0, color: primaryColor, fontSize: '24px' }}>
                        Verify Your Profile
                    </h2>
                    <p style={{ marginTop: '8px', color: '#555', fontSize: '14px' }}>
                        Please complete the following information to get verified. We will review your submission within 24 hours.
                    </p>
               </div>
                <div style={styles.field}>
                    <label style={styles.label} htmlFor="hourlyRate">
                        Hourly Rate:
                    </label>
                    <input
                        id="hourlyRate"
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="Enter hourly rate"
                        required
                        style={styles.input}
                        disabled={loading}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label} htmlFor="description">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your description"
                        required
                        style={styles.textarea}
                        disabled={loading}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label} htmlFor="idFile">
                        Upload ID:
                    </label>
                    <input
                        id="idFile"
                        type="file"
                        onChange={handleFileChange(setIdFile)}
                        accept="image/*,application/pdf"
                        required
                        style={styles.fileInput}
                        disabled={loading}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label} htmlFor="educationProofFile">
                        Proof of Education:
                    </label>
                    <input
                        id="educationProofFile"
                        type="file"
                        onChange={handleFileChange(setEducationProofFile)}
                        accept="image/*,application/pdf"
                        required
                        style={styles.fileInput}
                        disabled={loading}
                    />
                </div>

                {success && (
                    <p style={{ color: 'green', marginBottom: '10px' }}>
                        Your profile verification request has been submitted successfully.
                    </p>
                )}
                {error && (
                    <p style={{ color: 'red', marginBottom: '10px' }}>
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = hoverColor)}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = primaryColor)}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
        
    );
};

export default VerifyForm;
