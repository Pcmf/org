import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { Order } from '@org/shared';

export const orderResolver: ResolveFn<Order> = (route) => {
    const ordersService = inject(OrdersService);
    const id = route.paramMap.get('id');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return ordersService.getById(id!);
};
