import React, {Component, useMemo} from 'react';
import PropTypes from 'prop-types';
import Auth from "../Auth";
import UnAuth from "../UnAuth";



export default function mainBranch() {

    const authorizated = false
    const Branch = useMemo(() => authorizated ? Auth : UnAuth,[authorizated])
        return (
            <Branch />
        );
    }

mainBranch.propTypes = {};