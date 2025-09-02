import { HttpInterceptorFn } from '@angular/common/http';
import { host, key } from '../../api';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
    const isApiRequest = req.url.startsWith(host);

    if (isApiRequest) {
        req = req.clone({
            setHeaders: {
                Authorization: `key ${key}`
            }
        });
    }

    return next(req);
};
