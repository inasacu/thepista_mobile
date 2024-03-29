/*
 * hdjs.validate.js 1.0
 * Copyright (c) 2013 HaberdasheryJS, http://haberdasheryjs.com
 * hdjs.validate.js is open sourced under the MIT license.
 * Portions of validate.js are inspired by CodeIgniter.
 * Forked to a CommonJS module for use in Titanium Mobile from 
 * http://rickharrison.github.com/validate.js
 * by Rick Harrison, http://rickharrison.me
 * 
 */

/*
 * If you would like an application-wide config, change these defaults.
 * Otherwise, use the setMessage() function to configure form specific messages.
 */

var defaults = {
    messages: {
        required: 'El campo %s es requerido',
        matches: 'El campo %s no concuerda con el valor esperado: %s.',
        valid_email: 'El campo %s debe contener un email valido',
        valid_emails: 'El campo %s debe contener solo emails validos',
        min_length: 'The %s field must be at least %s characters in length.',
        max_length: 'The %s field must not exceed %s characters in length.',
        exact_length: 'The %s field must be exactly %s characters in length.',
        greater_than: 'The %s field must contain a number greater than %s.',
        less_than: 'The %s field must contain a number less than %s.',
        alpha: 'The %s field must only contain alphabetical characters.',
        alpha_numeric: 'El campo %s debe contener solo caracteres alfa-númericos',
        alpha_dash: 'The %s field must only contain alpha-numeric characters, underscores, and dashes.',
        numeric: 'El campo %s debe contener solo números',
        integer: 'The %s field must contain an integer.',
        decimal: 'The %s field must contain a decimal number.',
        is_natural: 'The %s field must contain only positive numbers.',
        is_natural_no_zero: 'The %s field must contain a number greater than zero.',
        valid_ip: 'The %s field must contain a valid IP.',
        valid_base64: 'The %s field must contain a base64 string.',
        valid_credit_card: 'The %s field must contain a valid credit card number.',
        valid_url: 'The %s field must contain a valid URL.'
    },
    callback: function(errors) {

    }
};

/*
 * Define the regular expressions that will be used
 */

var ruleRegex = /^(.+?)\[(.+)\]$/,
    numericRegex = /^[0-9]+$/,
    integerRegex = /^\-?[0-9]+$/,
    decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
    emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    alphaRegex = /^[a-z]+$/i,
    alphaNumericRegex = /^[a-z0-9]+$/i,
    alphaDashRegex = /^[a-z0-9_\-]+$/i,
    naturalRegex = /^[0-9]+$/i,
    naturalNoZeroRegex = /^[1-9][0-9]*$/i,
    ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
    base64Regex = /[^a-zA-Z0-9\/\+=]/i,
    numericDashRegex = /^[\d\-\s]+$/,
    urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;


/*
 * The exposed public object to validate a form:
 *
 * @param fields - Array - [{
 * 	   id: The field Id
 *     value: The value of the form element
 *     display: 'Field Name'
 *     rules: required|matches[password_confirm]
 * }]
 * @param callback - Function - The callback after validation has been performed.
 *     @argument errors - An array of validation errors
 */

var FormValidator = function() {
    this.errors = [];
    this.messages = {};
    this.handlers = {};
};


/*
 * @public
 * Sets a custom message for one of the rules
 */

FormValidator.prototype.setMessage = function(rule, message) {
    this.messages[rule] = message;

    // return this for chaining
    return this;
};

/*
 * @public
 * Registers a callback for a custom rule (i.e. callback_username_check)
 */

FormValidator.prototype.registerCallback = function(name, handler) {
    if (name && typeof name === 'string' && handler && typeof handler === 'function') {
        this.handlers[name] = handler;
    }

    // return this for chaining
    return this;
};

/*
 * @public
 * Runs the validation when the form is submitted.
 */

FormValidator.prototype.run = function(fields, callback) {
	callback = callback || defaults.callback;
	this.errors = [];
	this.messages = {};
	
	for (var i = 0, fieldsLength = fields.length; i < fieldsLength; i++) {
            /*
             * Run through the rules for each field.
             */
            this._validateField(fields[i]);
    }

    if (typeof callback === 'function') {
        callback(this.errors);
    }

    return true;
};

/*
 * @private
 * Looks at the fields value and evaluates it against the given rules
 */

FormValidator.prototype._validateField = function(field) {
    var rules = field.rules.split('|'),
        indexOfRequired = field.rules.indexOf('required'),
        isEmpty = (!field.value || field.value === '' || field.value === undefined);

    /*
     * Run through the rules and execute the validation methods as needed
     */

    for (var i = 0, ruleLength = rules.length; i < ruleLength; i++) {
        var method = rules[i],
            param = null,
            failed = false,
            parts = ruleRegex.exec(method);

        /*
         * If this field is not required and the value is empty, continue on to the next rule unless it's a callback.
         * This ensures that a callback will always be called but other rules will be skipped.
         */

        if (indexOfRequired === -1 && method.indexOf('!callback_') === -1 && isEmpty) {
            continue;
        }

        /*
         * If the rule has a parameter (i.e. matches[param]) split it out
         */

        if (parts) {
            method = parts[1];
            param = parts[2];
        }
        
        if (method.charAt(0) === '!') {
            method = method.substring(1, method.length);
        }

        /*
         * If the hook is defined, run it to find any validation errors
         */

        if (typeof this._hooks[method] === 'function') {
            if (!this._hooks[method].apply(this, [field, param])) {
                failed = true;
            }
        } else if (method.substring(0, 9) === 'callback_') {
            // Custom method. Execute the handler if it was registered
            method = method.substring(9, method.length);

            if (typeof this.handlers[method] === 'function') {
                if (this.handlers[method].apply(this, [field.value, param]) === false) {
                    failed = true;
                }
            }
        }

        /*
         * If the hook failed, add a message to the errors array
         */
        if (failed) {
            // Make sure we have a message for this rule
            var source = this.messages[method] || defaults.messages[method],
                message = 'An error has occurred with the ' + field.display + ' field.';

            if (source) {
                message = source.replace('%s', field.display);

                if (param) {
                    message = message.replace('%s', param);
                }
            }

            this.errors.push({
                name: field.display,
                message: message,
                rule: method
            });

            // Break out so as to not spam with validation errors (i.e. required and valid_email)
            break;
        }
    }
};

/*
 * @private
 * Object containing all of the validation hooks
 */

FormValidator.prototype._hooks = {
    required: function(field) {
        var value = field.value;
        return (value !== null && value !== '');
    },

    matches: function(field, value) {
    	return field.value.toString() === value.toString(); 
    },

    valid_email: function(field) {
        return emailRegex.test(field.value);
    },

    valid_emails: function(field) {
        var result = field.value.split(",");

        for (var i = 0; i < result.length; i++) {
            if (!emailRegex.test(result[i])) {
                return false;
            }
        }

        return true;
    },

    min_length: function(field, length) {
        if (!numericRegex.test(length)) {
            return false;
        }

        return (field.value.length >= parseInt(length, 10));
    },

    max_length: function(field, length) {
        if (!numericRegex.test(length)) {
            return false;
        }

        return (field.value.length <= parseInt(length, 10));
    },

    exact_length: function(field, length) {
        if (!numericRegex.test(length)) {
            return false;
        }

        return (field.value.length === parseInt(length, 10));
    },

    greater_than: function(field, param) {
        if (!decimalRegex.test(field.value)) {
            return false;
        }

        return (parseFloat(field.value) > parseFloat(param));
    },

    less_than: function(field, param) {
        if (!decimalRegex.test(field.value)) {
            return false;
        }

        return (parseFloat(field.value) < parseFloat(param));
    },

    alpha: function(field) {
        return (alphaRegex.test(field.value));
    },

    alpha_numeric: function(field) {
        return (alphaNumericRegex.test(field.value));
    },

    alpha_dash: function(field) {
        return (alphaDashRegex.test(field.value));
    },

    numeric: function(field) {
        return (numericRegex.test(field.value));
    },

    integer: function(field) {
        return (integerRegex.test(field.value));
    },

    decimal: function(field) {
        return (decimalRegex.test(field.value));
    },

    is_natural: function(field) {
        return (naturalRegex.test(field.value));
    },

    is_natural_no_zero: function(field) {
        return (naturalNoZeroRegex.test(field.value));
    },

    valid_ip: function(field) {
        return (ipRegex.test(field.value));
    },

    valid_base64: function(field) {
        return (base64Regex.test(field.value));
    },

    valid_url: function(field) {
        return (urlRegex.test(field.value));
    },

    valid_credit_card: function(field){
        // Luhn Check Code from https://gist.github.com/4075533
        // accept only digits, dashes or spaces
        if (!numericDashRegex.test(field.value)) return false;

        // The Luhn Algorithm. It's so pretty.
        var nCheck = 0, nDigit = 0, bEven = false;
        var strippedField = field.value.replace(/\D/g, "");

        for (var n = strippedField.length - 1; n >= 0; n--) {
            var cDigit = strippedField.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    }

};

exports.FormValidator = FormValidator;