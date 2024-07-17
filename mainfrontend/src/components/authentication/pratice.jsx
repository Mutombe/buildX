export default function Profile() {
    return (
        <Avatar
            person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
            size={100}
        />
    )
}

import { getImageUrl } from './utils.js';

function Avatar({ person, size }) {
    //person and size and are available here

    return (
        <img
            className='avatar'
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}

export default function Profile() {
    return (
        <>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />

            <Avatar
                size={100}
                person={{
                    name: 'Simbarashe Mutombe',
                    imageId: 'YfeOqp2'
                }}
            />

            <Avatar
                size={50}
                person={{
                    name: 'Tsungai Nakamoto',
                    imageId: 'YfeOqp2'
                }}
            />
        </>
    )
}


function Card({ children }) {
    return (
        <div className='card'>
            {children}
        </div>
    );
}

export default function Profile2() {
    return (
        <Card>
            <Avatar
                size={100}
                person={{ 
                    name: 'Simba Mtombe',
                    imageId: 'ds2Tpd1'
                 }}
            />
        </Card>
    )
}