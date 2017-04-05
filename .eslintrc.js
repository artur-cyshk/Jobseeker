module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "eqeqeq": 2,
        "no-console": 0,
        "curly": 2,
        "strict": [2, "global"],
        "no-undef": 0
    },
    "parserOptions": {
        "sourceType": "module"
    }
};
