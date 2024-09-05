import { Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// ProtectedRoute component that checks for an auth token
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem('token');

    return (
        <Route
            {...rest}
            render={(props) =>
                token ? (
                    <Component {...props} />
                ) : (
                     navigate('/login')
                )
            }
        />
    );
};

export default ProtectedRoute;
