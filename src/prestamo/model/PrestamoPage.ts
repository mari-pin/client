import { Pageable } from "../../app/core/model/page/Pageable";
import { Prestamo } from "./Prestamo";


export class PrestamoPage {
    content: Prestamo[];
    pageable: Pageable;
    totalElements: number;
}