import { PrestamoPage } from "./PrestamoPage";

export const PRESTAMOS_DATA: PrestamoPage = {
    content: [
        { id: 1, game: { id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' } }, client: { id: 1, name: 'User 1' }, initDate: new Date('2025-04-10'), endDate: new Date('2025-05-6') },
        { id: 2, game: { id: 2, title: 'Juego 2', age: 6, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2' } }, client: { id: 2, name: 'User 2' }, initDate: new Date('2025-04-10'), endDate: new Date('2025-05-6') },
        { id: 3, game: { id: 3, title: 'Juego 3', age: 6, category: { id: 3, name: 'Categoría 3' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' } }, client: { id: 3, name: 'User 3' }, initDate: new Date('2025-04-10'), endDate: new Date('2025-05-6') },
        { id: 4, game: { id: 4, title: 'Juego 4', age: 6, category: { id: 4, name: 'Categoría 4' }, author: { id: 4, name: 'Autor 4', nationality: 'Nacionalidad 4' } }, client: { id: 4, name: 'User 4' }, initDate: new Date('2025-04-10'), endDate: new Date('2025-05-6') },


    ],
    pageable: { 
        pageNumber: 0, 
        pageSize: 5, 
        sort:[ {property:'id', direction: 'ASC'}]
     },
    totalElements: 4,
    //totalPages: 1


} 