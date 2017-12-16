import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const FilterLink = ({ filter, children }) => (
    <Link
        to={filter}
    >
        {children}
    </Link>
);

FilterLink.propTypes = {
    filter: PropTypes.oneOf(['/', '/players', '/matches']).isRequired,
    children: PropTypes.node.isRequired,
};

export default FilterLink;