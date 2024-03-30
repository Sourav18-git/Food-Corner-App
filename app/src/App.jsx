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

   
    useEffect(()=>{
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
    },[]);

const searchFood=(e)=>{
const searchValue=e.target.value;
console.log(searchValue);
if(searchValue==''){
    setFilterData(null);
}
 const filter = data?.filter((food) =>
food.name.toLowerCase().includes(searchValue.toLowerCase())
);
setFilterData(filter);}

const filterdFood=(type)=>{
    if(type=='all'){
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

    if(error) return <div>{error}</div>;
    if(loading)return <div>loading...</div>
    return<> <Container>
        <TopContainer>
            <div className="logo">
                <img src="/Foody Zone.svg" alt="logo" />

            </div>
            <div className="search">
                <input onChange={searchFood} placeholder='Search Food' />
            </div>
        </TopContainer>
        <FilterContainer>
            <Button onClick={()=>filterdFood('all')}>All</Button>
            <Button onClick={()=>filterdFood('breakfast')}>Breakfast</Button>
            <Button onClick={()=>filterdFood("lunch")}>Lunch</Button>
            <Button onClick={()=>filterdFood("dinner")}>Dinner</Button>
        </FilterContainer>
        
    </Container>
    <SearchResult data={filterData}/>
    </>
};
export default App;
export const Container = styled.div`
max-width:1400px;
margin: 0 auto;
`;
const TopContainer = styled.section`
min-height:140px;
display:flex;
justify-content:space-between;
align-items:center;
padding:10px;
.search{
    input{
    background-color: transparent;
    border:1px solid  red;
    color:white;
    border-radius:5px;
       height:40px;
font-size:16px;
padding:0 10px 
    }
}
`;
const FilterContainer = styled.section`
display:flex;
justify-content: center;
gap:12px;
padding-bottom: 40px;

`;
 export const Button = styled.button`
background:red;
padding: 5px;
border-radius: 5px;
border: none;
color: white;
cursor: pointer;
`;
