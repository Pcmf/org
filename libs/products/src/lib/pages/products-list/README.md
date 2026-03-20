On the develop branch the list of products was fully loaded on init.
but the ideia is to use the api to load products by category/ies if some is selected.
And every time we select or unselect we use the the api. 


For that we will get an array of categories ids from the side-menu and the use it on the api

This are others aproachs 

    /**
     * With RxJs
     * Using the api to filter on BE
     */
    // readonly products = toSignal(
    //   toObservable(this.selectedCategories).pipe(
    //     debounceTime(300),
    //     switchMap(ids => this.productsService.getAll(ids))
    //   ),
    //   { initialValue: [] }
    // );

    /**
     * Loading all products and them filter on FE
     */
    // readonly allProducts = toSignal(this.productsService.getAll(), {initialValue: []});
    //filter by categories
    // readonly products = computed(() => {
    //   return this.allProducts();
    //   // const selectedIds = new Set(this.selectedCategories());
    //   // if(selectedIds.size === 0) return this.allProducts();
    //   // return this.allProducts().filter(prod => selectedIds.has(prod.category._id)
    //   // );
    // });