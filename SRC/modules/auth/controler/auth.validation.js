

import joi from 'joi'
import { generalFaild } from '../../../Middleware/validation.js'


export const sginUpSchema={
    body:joi.object({

        userName:joi.string().min(2).max(30).required(),
        email:generalFaild.email,
        password:generalFaild.password,
        CPassword:joi.ref('password')
    }).required(),
  
}

export const logIN=joi.object({
    email:joi.string().alphanum()
    .email({minDomainSegments:2,maxDomainSegments:3,tlds:{allow:['com','edu']} }),
    password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    CPassword:joi.ref('password')
}).required()

