import { BaseFilter } from "../baseFilter/baseFilter";

export class ProductFilter extends BaseFilter {
    category: string;
    searchTerm: string;

    constructor() {
        super();

        this.category = '';
        this.searchTerm = '';
    }
}