export type PurchaseReasons = PurchaseReasonRes[]

export interface PurchaseReasonRes {
    id: number
    name: string
    subReasons: PurchaseSubReason[]
}

export interface PurchaseSubReason {
    id: number
    name: string
}
