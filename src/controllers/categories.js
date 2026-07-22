// Import any needed model functions
import {
    getAllCategories,
    getCategoryDetails,
    getProjectsByCategoryId,
    getCategoriesByProjectId,
    updateCategoryAssignments,
    createCategory,
    updateCategory
} from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters')
];

// Display all categories
const showCategoriesPage = async (req, res) => {

    const categories = await getAllCategories();

    const title = 'Service Project Categories';

    res.render('categories', {
        title,
        categories
    });

};

// Display a single category
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

// Display assign categories form
const showAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', {
        title,
        projectId,
        projectDetails,
        categories,
        assignedCategories
    });

};

// Process assign categories form
const processAssignCategoriesForm = async (req, res) => {

    const projectId = req.params.projectId;

    const selectedCategoryIds = req.body.categories || [];

    const categoryIdsArray = Array.isArray(selectedCategoryIds)
        ? selectedCategoryIds
        : [selectedCategoryIds];

    await updateCategoryAssignments(projectId, categoryIdsArray);

    req.flash('success', 'Categories updated successfully.');

    res.redirect(`/project/${projectId}`);

};

// Display create category form
const showNewCategoryForm = async (req, res) => {

    const title = 'Create Category';

    res.render('new-category', {
        title
    });

};

// Process create category form
const processNewCategoryForm = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-category');
    }

    const { name } = req.body;

    try {

        const categoryId = await createCategory(name);

        req.flash('success', 'Category created successfully.');

        res.redirect(`/category/${categoryId}`);

    } catch (error) {

        console.error(error);

        req.flash('error', 'Unable to create category.');

        res.redirect('/new-category');
    }

};

// Display edit category form
const showEditCategoryForm = async (req, res) => {

    const id = req.params.id;

    const category = await getCategoryDetails(id);

    const title = 'Edit Category';

    res.render('edit-category', {
        title,
        category
    });

};

// Process edit category form
const processEditCategoryForm = async (req, res) => {

    const id = req.params.id;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-category/${id}`);
    }

    const { name } = req.body;

    try {

        await updateCategory(id, name);

        req.flash('success', 'Category updated successfully.');

        res.redirect(`/category/${id}`);

    } catch (error) {

        console.error(error);

        req.flash('error', 'Unable to update category.');

        res.redirect(`/edit-category/${id}`);
    }

};

// Export controller functions
export {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
};