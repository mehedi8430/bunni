export type TBusiness = {
    id: string | number;
    business_start: string | number;
    customer_size: string | number;
    accept_peyments: string;
    like_to_do: string;
    payment_method: string;
    city: string;
    first_name: string;
    last_name: string;
    business_name: string;
    business_do: string;
    legal_stucture: string;
    business_type: string;
    business_country: string;
    business_currency: string;
    phone: string;
    created_at: string;
    updated_at: string;
    owner: [
        number | string
    ]
}