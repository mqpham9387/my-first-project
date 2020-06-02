import { formatDate } from '@angular/common';
export function toInteger(value: any): number {
    return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
    return (value !== undefined && value !== null) ? `${value}` : '';
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
    return value !== undefined && value !== null;
}

export function padLeft(num, size: number): string {
    let s = num.toString();
    while (s.length < size) s = "0" + s;
    return s;
}

export function padRight(num, size: number): string {
    let s = num.toString();
    while (s.length < size) s = s + "0";
    return s;
}

export function reNull(value: any, isNumber: boolean = false) {
    if (value == null) {
        if (isNumber) {
            return 0;
        }
        else {
            return "";
        }
    }
    else {
        return value;
    }
}

export function arrSort(array, sortBy: string) {
    array.sort(function (a, b) {
        var A = isString(a[sortBy]) ? a[sortBy].toUpperCase() : a[sortBy]; // bỏ qua hoa thường
        var B = isString(b[sortBy]) ? b[sortBy].toUpperCase() : b[sortBy]; // bỏ qua hoa thường
        if (A < B) {
            return -1;
        }
        if (A > B) {
            return 1;
        }
        //trùng nhau
        return 0;
    });
}

export function newID(prefix: string = "", value: any, suffix: string = "", totalLength: number) {
    let s = (value.toInteger() + 1).toString();
    let padLength = totalLength - (prefix.length + suffix.length)
    return prefix + padLeft(s, padLength) + suffix
}

export function isEqual(obj1, obj2) {
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) {
        console.log('debug1_1')
        return false;
    }

    for (let objKey of obj1Keys) {
        if (obj1Keys[objKey] !== obj2Keys[objKey]) {
            console.log('debug1_2', objKey)
            return false;
        }
        if (objKey === 'personContact') { console.log(typeof (obj1[objKey])) }
        if (typeof (obj1[objKey]) === 'object' && obj1[objKey] != null) {
            if (!isEqual(obj1[objKey], obj2[objKey])) {

                return false;
            }
            else {
                console.log('debug1_3', objKey, obj1[objKey], obj2[objKey]);
            }
        }
        else if (obj1[objKey] !== obj2[objKey]) {
            return false;
        }
    }

    return true;
}

export function isEqualArray(obj1, obj2) {
    console.log(obj1, obj2);
    if (obj1.length !== obj2.length) {
        console.log('debug1');
        return false
    }

    for (let i = 0; i < obj1.length; i++) {
        if (!isEqual(obj1[i], obj2[i])) {
            console.log('debug2', i);
            return false;
        }
    }

    return true;
}

export function isWebsite(website) {
    var newValue = website;
    if (newValue !== null && newValue !== '') {
        var res = newValue.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null) {
            return false;
        }
    }
    return true;
}

export function isEmail(email) {
    var newValue = email;
    if (newValue !== null && newValue !== '') {
        var res = newValue.match(/^\S*[@]\S*[.]\S*$/g);
        if (res == null) {
            return false;
        }
    }
    return true;
}

export function isPhone(phone) {
    var newValue = phone;
    var res = newValue.match(/[0-9]{2,256}\./g);
    if (res == null) {
        return false;
    }
    return true;
}

export function transportValue(obj1, obj2) {
    let obj1Keys = Object.keys(obj1);
    for (let objKey of obj1Keys) {
        if (obj2[objKey] != undefined) {
            obj1[objKey] = obj2[objKey];
        }
    }
    console.log(obj1);
    return obj1;
}

export function isRowNull(obj1) {
    let obj1Keys = Object.keys(obj1);
    for (let objKey of obj1Keys) {
        if (obj1[objKey] !== null && obj1[objKey] !== '' && objKey !== 'rowStatus') {
            return false;
        }
    }
    return true;
}

export function isObjHasAtLeastValue(obj: any): boolean {
    let hasVal = false;
    for (let prop in obj) {
        hasVal = obj.hasOwnProperty(prop) && obj[prop] !== null && obj[prop] !== '' && obj[prop] !== undefined;
        if (hasVal) break;
    }
    return hasVal;
}

/**
 * Format 'dd/mm/YYYY' to 'yyyy-MM-dd'
 * @param dateTime string
 * @return string
 */
export function formatDateInput(dateTime: string): string {
    const d = dateTime ? dateTime.split('/').reverse().join('-') : '';

    return dateTime ? formatDate(d, 'yyyy-MM-dd', 'en-US') : '';
}

export function getNumericCellEditor() {
    function isCharNumeric(charStr) {
        return !!/\d/.test(charStr);
    }
    function isKeyPressedNumeric(event) {
        var charCode = getCharCodeFromEvent(event);
        var charStr = String.fromCharCode(charCode);
        return isCharNumeric(charStr);
    }
    function getCharCodeFromEvent(event) {
        event = event || window.event;
        return typeof event.which === 'undefined' ? event.keyCode : event.which;
    }
    function NumericCellEditor() { }
    NumericCellEditor.prototype.init = function (params) {
        this.focusAfterAttached = params.cellStartedEdit;
        this.eInput = document.createElement('input');
        this.eInput.style.width = '100%';
        this.eInput.style.height = '100%';
        this.eInput.value = isCharNumeric(params.charPress)
            ? params.charPress
            : params.value;
        var that = this;
        this.eInput.addEventListener('keypress', function (event) {
            if (!isKeyPressedNumeric(event)) {
                that.eInput.focus();
                if (event.preventDefault) event.preventDefault();
            }
        });
    };
    NumericCellEditor.prototype.getGui = function () {
        return this.eInput;
    };
    NumericCellEditor.prototype.afterGuiAttached = function () {
        if (this.focusAfterAttached) {
            this.eInput.focus();
            this.eInput.select();
        }
    };
    NumericCellEditor.prototype.isCancelBeforeStart = function () {
        return this.cancelBeforeStart;
    };
    NumericCellEditor.prototype.isCancelAfterEnd = function () { };
    NumericCellEditor.prototype.getValue = function () {
        return this.eInput.value;
    };
    NumericCellEditor.prototype.focusIn = function () {
        var eInput = this.getGui();
        eInput.focus();
        eInput.select();
        console.log('NumericCellEditor.focusIn()');
    };
    NumericCellEditor.prototype.focusOut = function () {
        console.log('NumericCellEditor.focusOut()');
    };
    return NumericCellEditor;
}

/**
 * Format the number by commas
 * @param num the number format
 */
export function formatNumCommas(num: any): number | string {
    return !isNaN(num) ? Number(num).toLocaleString('en-GB') : num;
}

export function filterDiffArray(firstArray: any, secondArray: any) {
    return firstArray.filter(firstArrayItem =>
        !secondArray.some(
            secondArrayItem => firstArrayItem._id === secondArrayItem._id
        )
    );
};