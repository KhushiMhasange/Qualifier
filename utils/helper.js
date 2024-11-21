function processPostRequest(data) {
    const { data: inputData, file_b64,full_name,dob } = data;

    if (!full_name || !dob) {
        throw new Error("Missing full_name or dob in the request data.");
    }

    const numbers = inputData.filter(item => !isNaN(item));
    const alphabets = inputData.filter(item => /^[a-zA-Z]$/.test(item));

    const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
    const highestLowercase = lowercaseAlphabets.length
        ? [lowercaseAlphabets.sort().slice(-1)[0]]
        : [];

    
    const isPrimeFound = numbers.some(num => isPrime(Number(num)));

    
    const fileValid = file_b64 && isValidBase64(file_b64);
    const fileMimeType = fileValid ? getMimeType(file_b64) : null;
    const fileSizeKb = fileValid ? getFileSizeKb(file_b64) : null;
    const userId = `${data.full_name.replace(/\s+/g, '_').toLowerCase()}_${data.dob.replace(/-/g, '')}`;

    return {
        is_success: true,
        user_id: userId, 
        email: "john@xyz.com",       
        roll_number: "ABCD123",      
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase,
        is_prime_found: isPrimeFound,
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    };
}


function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}


function isValidBase64(base64String) {
    const regex = /^[A-Za-z0-9+/=]+$/;
    return regex.test(base64String);
}


function getMimeType(base64String) {
    const mimeMatch = base64String.match(/^data:([^;]+);base64,/);
    return mimeMatch ? mimeMatch[1] : null;
}


function getFileSizeKb(base64String) {
    const stringLength = base64String.length - (base64String.indexOf(',') + 1);
    const sizeInBytes = (stringLength * 3) / 4 - (base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0);
    return (sizeInBytes / 1024).toFixed(2); // Return size in KB
}

module.exports = { processPostRequest };
