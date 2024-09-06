import { Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';

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
                     redirect('login')
                )
            }
        />
    );
};

export default ProtectedRoute;
