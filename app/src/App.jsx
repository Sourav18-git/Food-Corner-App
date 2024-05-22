import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/Serachresult/SearchResult';

export const BASE_URL = 'http://localhost:9000'

const App = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [selcetedButton, setSelectedButton] = useState(null);


    useEffect(() => {
        const fetchFoodData = async () => {
            setLoading(true);
            try {
                const response = await fetch(BASE_URL);
                const json = await response.json();

                setLoading(false);
                console.log(json);
                setData(json);
                setFilterData(json);
            } catch (error) {
                setError("unable to fetch data");
            }

        };
        fetchFoodData();
    }, []);

    const searchFood = (e) => {
        const searchValue = e.target.value;
        console.log(searchValue);
        if (searchValue == '') {
            setFilterData(null);
        }
        const filter = data?.filter((food) =>
            food.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilterData(filter);
    }

    const filterdFood = (type) => {
        if (type == 'all') {
            setFilterData(data);
            selcetedButton('all')
            return;
        }
        const filter = data?.filter((food) =>
            food.type.toLowerCase().includes(type.toLowerCase())
        );
        setFilterData(filter);
        setSelectedButton(type);
    }
    const filterBtns = [
        {
            name: 'All',
            type: 'all'
        },
        {
            name: 'Breakfast',
            type: 'breakfast'
        },
        {
            name: 'Lunch',
            type: 'lunch'
        },
        {
            name: 'Dinner',
            type: 'dinner'
        }
    ]

    if (error) return <div>{error}</div>;
    if (loading) return <div>loading...</div>
    return <> <Container>
        <TopContainer>
            <div className="logo">
                <img src="/Foody Zone.svg" alt="logo" />

            </div>
            <div className="search">
                <input onChange={searchFood} placeholder='Search Food' />
            </div>
        </TopContainer>
        <FilterContainer>
            {filterBtns.map((value) => (
                <Button key={value.name} isSelected={selcetedButton == (value.type)} onClick={() => filterdFood(value.type)} >{value.name}</Button>
            ))}
        </FilterContainer>

    </Container>
        <SearchResult data={filterData} />
    </>
};
export default App;
export const Container = styled.div`
max-width:1400px;
margin: 0 auto;
`;

const TopContainer = styled.section`
height:140px;
display:flex;
justify-content:space-between;
align-items:center;
padding:10px;
.logo img{
    /* width: 50%; */
    /* height: 90%; */
    /* margin-top: 12px; */
}

.search{
    input{
    background-color: transparent;
    border:1px solid  red;
    color:white;
    border-radius:5px;
       height:40px;
font-size:16px;
padding:0 10px ;
 ::placeholder{
    color: white;
}
    }
}
@media(0 <width<600px){
    flex-direction: column;
height: 120px;
}
`;
const FilterContainer = styled.section`
display:flex;
justify-content: center;
gap:12px;
padding-bottom: 40px;

`;
export const Button = styled.button`
background:${({ isSelected }) => isSelected ? "#f22f2f" : '#ff4343'};
outline: 1px solid ${({ isSelected }) => isSelected ? "white" : '#ff4343'};
padding: 5px;
border-radius: 5px;
border: none;
color: white;
cursor: pointer;
`;
