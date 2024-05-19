import React from 'react'

const Query = () => {
    const findAllUsers = 'findAllUsers { ' +
        'active ' +
        'banned ' +
        'eggs ' +
        'email ' +
        'hash ' +
        'id ' +
        'img ' +
        'name ' +
        'rol ' +
        'goldenEggs ' +
    '}'

    const findLastLogins = 'findLastLogins(aux: "") {' +
        'count' +
        'date' +
    '}';
    
    const findRegisterAlongTime = 'findRegisterAlongTime(ok: false) {' +
        'count' +
        'date' +
    '}';

    return {
        findAllUsers,
        findLastLogins,
        findRegisterAlongTime,
    }
}

export default Query