// Import any needed model functions
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId
} from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Project Categories';

    res.render('categories', {
        title,
        categories
    });

};

const showCategoryDetailsPage = async (req, res) => {

    const id = req.params.id;

    const category = await getCategoryDetails(id);

    const projects = await getProjectsByCategoryId(id);

    res.render('category', {
        title: category.name,
        category,
        projects
    });

};

// Export any controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage
};