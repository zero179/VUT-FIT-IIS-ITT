export interface UserLogDTO {
    _id: string
    date: string
    type: string
    description: string
    connection: string
    connection_id: string
    client_id: string
    client_name: string
    ip: string
    user_agent: string
    details: any
    user_id: string
    user_name: string
    strategy: string
    strategy_type: string
    log_id: string
    isMobile: boolean,
    location_info: {
        country_code: string
        country_code3: string
        country_name: string
        city_name: string
        latitude: number
        longitude: number
        time_zone: string
        continent_code: string
    }
}