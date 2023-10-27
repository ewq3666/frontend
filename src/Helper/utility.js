// Function for getting first two letter of string
export const getFirstTwoLetters = (name) => { 
    if (name && name.length >= 2) {
        return name.substring(0, 2).toUpperCase();
    }
    return name?.charAt(0).toUpperCase();
};

// Function for capitalize each word
export const capitalizeEachWord = (str) => {
    return str
        ?.split(' ')
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(' ');
};