import { BaseFilter } from "../baseFilter/baseFilter";

export class ProductFilter extends BaseFilter {
    category: string;
    searchTerm: string;

   filterByLowPrice: boolean;
   filterByHighPrice: boolean; 

    constructor() {
        super();

        this.category = '';
        this.searchTerm = '';
        this.filterByHighPrice = false;
        this.filterByLowPrice = false;
    }
}