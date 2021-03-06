import React, { useCallback, useEffect, useState } from 'react';
import GlobalMenuDev from '../../../components/GlobalMenuDev';
import UsersDev from '../../../components/UsersDev';
import Modal from '../../../components/ModalUsers';
import api from '../../../services/api';
import { Button, Box } from './styles';

const DevUsers = () => {

    const [user, setUser] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    const updateUsers = useCallback(async () => {
        loadingUsers();
        if (selectedUser) {
            const index = user.findIndex(u => u.id === selectedUser.id);
            setSelectedUser(user[index]);
        }
    }, [loadingUsers, user, selectedUser]);

    const loadingUsers = useCallback(async () => {
        try {
            const response = await api.get('/users');
            if (response.data) {
                setUser(response.data);
                setFilter(response.data);
            }
        } catch (error) {
            console.log('Ocorreu uma falha na comunicação com a API')
        }
    }, []);

    useEffect(() => {
        loadingUsers();
    }, [loadingUsers]);

    const handleSearch = useCallback(() => {
        if (search === '') {
            setFilter(user);
        } else {
            const result = user.filter(u => u.nomeCompleto && u.nomeCompleto.toUpperCase().includes(search.toUpperCase()));
            setFilter(result);
        }
    }, [search]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    const remove = async (id) => {
        const result = filter.filter(u => u.id !== id);
        setUser(user.filter(u => u.id !== id));
        setFilter(result);
        await api.delete(`/users/${id}`);
    };

    return (
        <>
            <GlobalMenuDev />
            <div style={{
                width: "85%",
                height: "100%",
                marginLeft: "15%",
            }} >
                <form>
                    <Box
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Pesquisar Usuário"
                        onChange={e => setSearch(e.target.value)}
                    />
                </form>

                {filter.map(u => {
                    return (
                        <div key={u.id} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            border: "2px solid #841e8a",
                            paddingRight: "50px",
                            borderBottom: "0",
                            // borderTop: "0",
                            borderRight: "0",
                            borderLeft: "0",
                        }}>
                            <div style={{
                                cursor: "pointer",
                                marginTop: "20px",
                                marginBottom: "20px",
                                marginLeft: "20px"
                            }} onClick={() => { setSelectedUser(u); setModalVisible(true); }} >
                                <UsersDev user={u} />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyItems: 'center',
                                alignItems: "center",
                            }}>
                                <Button onClick={() => remove(u.id)}>Deletar</Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {modalVisible ?
                <Modal
                    onUpdate={() => updateUsers()}
                    onClose={() => setModalVisible(false)}
                    selectedUser={selectedUser}
                /> : null}
        </>
    );
}
export default DevUsers;