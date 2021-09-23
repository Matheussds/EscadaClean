import firestore from '@react-native-firebase/firestore';

const apts = firestore().collection('apartments')


export function getApartments(setApts, setLoading) {
    apts.orderBy('description', 'asc')
    .onSnapshot((querySnapshot) => {
        const apartments = [];

        querySnapshot.forEach(documentSnapshot => {
            apartments.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
            });
        });

        setApts(apartments);
        setLoading(false);
    });
}

export function deleteApt(key) {
    apts.doc(key)
        .delete()
        .then(() => {
            console.log('User deleted!');
        })
}