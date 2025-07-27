// Converted from PreviewDelta to React PDF structure
import {
    Document,
    Page,
    View,
    Text,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";
import { images } from "@/lib/imageProvider";
import type { InvoiceTemplateProps } from "@/types/download.invoice.type";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#f9fafc",
        padding: 24,
        fontSize: 10,
        color: "#000",
        fontFamily: "Helvetica",
    },
    logo: {
        height: 80,
        width: 80,
        marginRight: 12,
        objectFit: "contain",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    companyInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    contactBlock: {
        fontSize: 8,
    },
    addressBlock: {
        textAlign: "right",
        fontSize: 8,
    },
    section: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    column: {
        flex: 1,
    },
    rightAlign: {
        textAlign: "right",
    },
    label: {
        fontSize: 8,
        fontWeight: "bold",
        marginBottom: 2,
        textTransform: "uppercase",
    },
    value: {
        fontSize: 8,
        marginBottom: 2,
    },
    tableHeader: {
        flexDirection: "row",
        paddingVertical: 4,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 4,
    },
    tableCell: {
        flex: 1,
    },
    footer: {
        marginTop: 12,
    },
    // tableSum: {
    //     flexDirection: "row", 
    //     justifyContent: "flex-end", 
    //     gap: 10, 
    //     paddingRight: 5, 
    //     paddingTop: 10
    // }
});

const PreviewDeltaPDF = ({
    invoice,
}: InvoiceTemplateProps) => {
    const {
        color,
        footerTerms,
        invoiceNumber,
        invoiceDate,
        billTo,
        paymentDetails,
        items,
        subtotal,
        totalTax,
        total,
        dueDate,
        serviceDate
    } = invoice;
    console.log(invoice);

    const billFrom = {
        name: "Jane Smith",
        address: "456 Elm St City, State, Zip",
        phone: "555-5678",
    };

    return (
        <Document>
            <Page size="A4" style={{ ...styles.page, color: color, backgroundColor: `#F3F4F6` }}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.companyInfo}>
                        <Image style={styles.logo} src={images.templateLogo} />
                        <View>
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Company Name</Text>
                            <Text style={styles.contactBlock}>support@example.com</Text>
                            <Text style={styles.contactBlock}>+01234345</Text>
                        </View>
                    </View>
                    <View style={styles.addressBlock}>
                        <Text style={styles.contactBlock}>Business address</Text>
                        <Text style={styles.contactBlock}>{billFrom.address}</Text>
                        <Text style={styles.contactBlock}>{billFrom.phone}</Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={{ ...styles.section, borderWidth: 1, borderColor: color, backgroundColor: "#fff" }}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Bill To</Text>
                            <Text style={styles.value}>{billTo?.name}</Text>
                            <Text style={styles.value}>{billTo?.address}</Text>
                            <Text style={styles.value}>{billTo?.phone}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Invoice number</Text>
                            <Text style={{ ...styles.value, marginBottom: 12 }}>#{invoiceNumber}</Text>
                            <Text style={styles.label}>Service date</Text>
                            <Text style={styles.value}>{serviceDate}</Text>
                        </View>
                        <View style={[styles.column, styles.rightAlign]}>
                            <Text style={styles.label}>Payment</Text>
                            <Text style={styles.value}>{paymentDetails.accountType}</Text>
                            <Text style={styles.value}>{paymentDetails.accountNumber}</Text>
                            <Text style={[styles.value, { fontWeight: "bold" }]}>
                                {paymentDetails.paymentMethod}
                            </Text>
                            <Text style={styles.value}>{paymentDetails.bankName}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>Invoice date</Text>
                            <Text style={styles.value}>{invoiceDate}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Due date</Text>
                            <Text style={styles.value}>{dueDate}</Text>
                        </View>
                    </View>

                    {/* Table */}
                    <View>
                        <View style={{ ...styles.tableHeader, borderBottomWidth: 0.5, borderColor: '#ccc', borderTopWidth: 0.5, borderTopColor: '#ccc' }}>
                            <Text style={[styles.tableCell, { flex: 3, fontWeight: "bold", fontSize: 9 }]}>Item Detail</Text>
                            <Text style={[styles.tableCell, { fontWeight: "bold", fontSize: 9 }]}>Price</Text>
                            <Text style={[styles.tableCell, { fontWeight: "bold", fontSize: 9 }]}>Qty.</Text>
                            <Text style={[styles.tableCell, { fontWeight: "bold", fontSize: 9 }]}>Total</Text>
                        </View>
                        {items.map((item, i) => (
                            <View key={i} style={{ ...styles.tableRow, borderBottomWidth: 0.5, borderColor: '#ccc' }}>
                                <Text style={[styles.tableCell, { flex: 3 }]}>{item.description}</Text>
                                <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
                                <Text style={styles.tableCell}>{item.quantity.toString().padStart(2, "0")}</Text>
                                <Text style={styles.tableCell}>${item.amount.toFixed(2)}</Text>
                            </View>
                        ))}

                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 5, textAlign: "right", fontWeight: "bold", paddingRight: 5 }]}>Subtotal:</Text>
                            <Text style={styles.tableCell}>${subtotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: 5, textAlign: "right", fontWeight: "bold", paddingRight: 5}]}>Tax:</Text>
                            <Text style={styles.tableCell}>${totalTax.toFixed(2)}</Text>
                        </View>
                        <View style={{
                            ...styles.tableRow, borderTopWidth: 0.5,
                            borderTopColor: "#ccc", width: "120px", alignSelf: "flex-end", paddingTop: 5, paddingBottom: 5, paddingLeft: 5
                        }}>
                            <Text style={[{ textAlign: "right", fontWeight: "bold", paddingRight: 5 }]}>Total:</Text>
                            <Text style={[{ fontWeight: "bold" }]}>${total.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Thank You */}
                    <View style={{ marginTop: 16 }}>
                        <Text style={[styles.label, { color }]}>Thanks for the business.</Text>
                    </View>
                </View>

                {/* Footer */}
                <View style={{ ...styles.footer, marginTop: "auto" }}>
                    <Text style={styles.label}>Terms & Conditions</Text>
                    <Text style={styles.value}>{footerTerms}</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PreviewDeltaPDF;


