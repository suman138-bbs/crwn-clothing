import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview.component/categories-preview.component';
import './shop.styles.scss'
import { useDispatch } from 'react-redux';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/category.action';
const Shop = () => {
    const dispatch = useDispatch()
     useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
           dispatch(setCategoriesMap(categoryMap))

        }
        
        getCategoriesMap();
    },[])
return (
    <Routes>
        <Route index element={<CategoriesPreview />} />
        <Route path=":category" element = {<Category/>}/>
        
    </Routes>
    )
}; 

export default Shop;