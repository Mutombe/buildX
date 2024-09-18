import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, subscribeToProperty, unsubscribeFromProperty } from "../../redux/subscriptionSlice";
import { Button } from "@mui/joy";
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const SubscriptionButton = ({ property_id }) => {
    const dispatch = useDispatch();
    
    // Get subscription status for the specific property
    const isSubscribed = useSelector((state) => state.subscription.subscriptions[property_id]);
    const error = useSelector((state) => state.subscription.error);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      dispatch(checkSubscriptionStatus({ property_id }));
    }, [dispatch, property_id]);
  
    const handleSubscription = async () => {
      setIsLoading(true);
      try {
        if (isSubscribed) {
          await dispatch(unsubscribeFromProperty({ property_id })).unwrap();
        } else {
          await dispatch(subscribeToProperty({ property_id })).unwrap();
        }
      } catch (err) {
        console.error('Failed to update subscription:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <Button
        onClick={handleSubscription}
        startDecorator={isSubscribed ? <UnpublishedIcon /> : <CheckCircleOutlineIcon />}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : (isSubscribed ? "Unsubscribe" : "Subscribe")}
      </Button>
    );
  };
  
  export default SubscriptionButton;
  