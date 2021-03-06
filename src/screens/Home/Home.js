import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import api from '../../services/api';
import path from 'path';
import MovieCard from '../../components/HomeComponents/MovieCard';

// Importação dos componentes
import MainCarousel from '../../components/HomeComponents/MainCarousel';
import Modal from 'react-bootstrap/Modal'

//Importação da Array de categorias
import Categorias from '../../components/Array'

// Importações de estilos da Navbar
import { Dropdown, UserImg, Logo, BgImage, Title, BgHover, CategorySection, Button } from './styles';
import { Navbar, Nav, Form, FormControl, NavDropdown, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    const history = useHistory();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            paritialVisibilityGutter: 60
        },
    };

    const [search, setSearch] = useState();
    const [storage, setStorage] = useState({});

    const [action, setAction] = useState([]); const [comedy, setComedy] = useState([]); const [terror, setTerror] = useState([]); const [tragedy, setTragedy] = useState([]); const [classic, setClassic] = useState([]); const [romance, setRomance] = useState([]); const [childish, setChildish] = useState([]); const [adventure, setAdventure] = useState([]); const [shortFilm, setShortFilm] = useState([]);

    const getStorage = useCallback(async () => {
        try {
            const storage = await localStorage.getItem('img')
            setStorage(JSON.parse(storage))
        } catch (error) {
            console.log(error)
        }
    }, []);

    const loadingSearch = useCallback(async () => {
        setComedy(comedy.filter(c => c.nome == search));
    }, [search]);

    const loadingAction = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Ação');
            if (response.data) setAction(response.data);
        } catch (error) {
            console.log('Falha no carregamento dos filmes de ação!');
        }
    }, []); const loadingComedy = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Comédia');
            if (response.data) setComedy(response.data);
        } catch (error) {
            console.log('Falha no carregamento dos filmes de comédia!');
        }
    }, []); const loadingTerror = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Terror');
            if (response.data) setTerror(response.data);
        } catch (error) {
            console.log('Falha no carregamento dos filmes de terror!');
        }
    }, []); const loadingTragedy = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Drama');
            if (response.data) setTragedy(response.data)
        } catch (error) {
            console.log('Falha no carregamento dos filmes de drama!');
        }
    }, []); const loadingClassic = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Clássico');
            if (response.data) setClassic(response.data)
        } catch (error) {
            console.log('Falha no carregamento dos filmes clássicos!');
        }
    }, []); const loadingRomance = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Romance');
            if (response.data) setRomance(response.data)
        } catch (error) {
            console.log('Falha no carregamento dos filmes de romance!');
        }
    }, []); const loadingChildish = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Infantil');
            if (response.data) setChildish(response.data);
        } catch (error) {
            console.log('Falha no carregamento dos filmes infantis!');
        }
    }, []); const loadingShortFilm = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Curta-Metragem');
            if (response.data) setShortFilm(response.data)
        } catch (error) {
            console.log('Falha no carregamento dos filmes de curta-metragem!');
        }
    }, []); const loadingAdventure = useCallback(async () => {
        try {
            const response = await api.get('/filmes/categoria/Aventura');
            if (response.data) setAdventure(response.data);
        } catch (error) {
            console.log('Falha no carregamento dos filmes de aventura!');
        }
    }, []);

    useEffect(() => { getStorage(); }, [getStorage]);

    useEffect(() => { loadingSearch(); }, [loadingSearch]);

    useEffect(() => {
        loadingAction(), loadingComedy(); loadingTerror(); loadingTragedy(); loadingClassic(); loadingRomance(); loadingChildish(); loadingAdventure(); loadingShortFilm();
    }, [loadingAction, loadingComedy, loadingAdventure, loadingTerror, loadingChildish, loadingShortFilm, loadingTragedy, loadingClassic, loadingRomance]);

    return (
        <>
            <Navbar fixed="top" variant="dark">
                <Navbar.Brand href="#home"><Logo src={path.join(__dirname, '../../assets/logo.png')} /></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#">Início</Nav.Link>
                    <Nav.Link href="#">Filmes</Nav.Link>
                    <Nav.Link href="#pricing">Minha Lista</Nav.Link>
                    <NavDropdown title="Categorias" id="basic-nav-dropdown">
                        {Categorias.map(c => {
                            return (
                                <Dropdown key={c.categoria} onClick={() => {
                                    localStorage.setItem('category', c.categoria);
                                    history.push('/categoria');
                                }}>
                                    {c.categoria}
                                </Dropdown>
                            );
                        })}
                    </NavDropdown>
                </Nav>
                <Form inline>
                    {/* <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                    /> */}
                    <UserImg href="action2" src={storage || ''} />
                    <NavDropdown id="navbarScrollingDropdown">
                        <Dropdown>Favoritos</Dropdown>
                        <Dropdown onClick={() => history.push('/perfil')}>Trocar Perfil</Dropdown>
                        <Dropdown onClick={() => history.push('/config')}>Configurações</Dropdown>
                        <NavDropdown.Divider />
                        <Dropdown onClick={() => history.push('/')}>Sair</Dropdown>
                    </NavDropdown>
                </Form>
            </Navbar>

            <MainCarousel />
            <CategorySection>
                <Title>Ação</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {action.map(a => {
                        return (
                            <div key={a.id}>
                                <MovieCard movie={a} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Comédia</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {comedy.map(c => {
                        return (
                            <div key={c.id}>
                                <MovieCard movie={c} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Aventura</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {adventure.map(ad => {
                        return (
                            <div key={ad.id}>
                                <MovieCard movie={ad} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Terror</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {terror.map(t => {
                        return (
                            <div key={t.id}>
                                <MovieCard movie={t} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Romance</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {romance.map(r => {
                        return (
                            <div key={r.id}>
                                <MovieCard movie={r} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Clássico</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {classic.map(cl => {
                        return (
                            <div key={cl.id}>
                                <MovieCard movie={cl} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Infantil</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {childish.map(ch => {
                        return (
                            <div key={ch.id}>
                                <MovieCard movie={ch} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Tragédia</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {tragedy.map(tr => {
                        return (
                            <div key={tr.id}>
                                <MovieCard movie={tr} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
            <CategorySection>
                <Title>Curta-Metragem</Title>
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={"desktop"}
                    itemClass="image-item"
                    responsive={responsive}
                >
                    {shortFilm.map(sf => {
                        return (
                            <div key={sf.id}>
                                <MovieCard movie={sf} />
                            </div>
                        );
                    })}
                </Carousel>
            </CategorySection>
        </>
    );
};

export default Home;
