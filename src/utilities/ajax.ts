import * as $ from 'jquery';
import PlainObject = JQuery.PlainObject;

const ajax = (url: string, cb: Function, headers?: PlainObject<string | null | undefined>, method?: string) => {
    $.ajax({
        headers: (headers) ? headers : {},
        success: (response: string) => {
            cb(response);
        },
        type: (method) ? method : 'GET',
        url
    });
};

export default ajax;
