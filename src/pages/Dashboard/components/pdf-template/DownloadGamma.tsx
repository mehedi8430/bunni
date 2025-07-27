import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import { images } from "@/lib/imageProvider";
import type { InvoiceTemplateProps } from "@/types/download.invoice.type";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: "Helvetica",
        color: "#000",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    logo: {
        width: 100,
        height: 70,
        objectFit: "contain",
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "right",
    },
    section: {
        flexDirection: "row",
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
        marginBottom: 20,
    },
    sectionBlock: {
        flex: 1,
        paddingHorizontal: 10,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 2,
    },
    table: {
        width: "100%",
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderColor: "#ccc",
        padding: 8,
    },
    tableRow: {
        flexDirection: "row",
        padding: 8,
    },
    tableCell: {
        flex: 1,
    },
    tableCellRight: {
        flex: 1,
        textAlign: "right",
    },
    footer: {
        borderTopWidth: 0.5,
        borderColor: "#ccc",
        paddingTop: 10,
        fontSize: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    padding: {
        paddingVertical: 10,
    },
    space: {
        whiteSpace: "nowrap"
    },
    tableSum: {
        flexDirection: "row", 
        justifyContent: "flex-end", 
        gap: 10, 
        paddingRight: 5, 
        paddingTop: 10
    }
});

export default function DownloadGamma({ invoice }: InvoiceTemplateProps) {
    console.log(invoice)
    const {
        color = "#38988A",
        footerTerms,
        invoiceNumber,
        invoiceDate,
        dueDate,
        // customerId,
        items,
        subtotal,
        totalTax,
        total,
        billTo,
    } = invoice;

    const billFrom = {
        name: "Jane Smith",
        address: "456 Elm St City, State, Zip",
        phone: "555-5678",
    };

    return (
        <Document>
            <Page size="A4" style={{ ...styles.page, color: color }}>
                <View style={styles.header}>
                    <View>
                        <Text style={{ ...styles.invoiceTitle, color }}>INVOICE</Text>
                        <Text># {invoiceNumber}</Text>
                    </View>
                    <Image src={images.templateLogo} style={styles.logo} />
                </View>

                <View style={styles.section}>
                    <View style={{...styles.sectionBlock, ...styles.padding}}>
                        <Text style={styles.label}>Issued</Text>
                        <Text>{invoiceDate}</Text>
                        <Text style={{...styles.label, marginTop: 10}}>Due</Text>
                        <Text>{dueDate}</Text>
                    </View>
                    <View style={{...styles.sectionBlock, ...styles.padding, borderLeftWidth: 0.5, borderLeftColor: "#ccc", borderRightWidth: 0.5, borderRightColor: "#ccc"}}>
                        <Text style={styles.label}>Bill To</Text>
                        <Text>{billTo.name}</Text>
                        <Text>{billTo.phone}</Text>
                        <Text style={styles.space}>{billTo.address}</Text>
                    </View>
                    <View style={{...styles.sectionBlock, ...styles.padding}}>
                        <Text style={styles.label}>From</Text>
                        <Text>{billFrom.name}</Text>
                        <Text>{billFrom.phone}</Text>
                        <Text>{billFrom.address}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={{...styles.tableCell, fontWeight: "bold"}}>Service</Text>
                        <Text style={{...styles.tableCellRight, fontWeight: "bold"}}>Price</Text>
                        <Text style={{...styles.tableCellRight, fontWeight: "bold"}}>Qty.</Text>
                        <Text style={{...styles.tableCellRight, fontWeight: "bold"}}>Line total</Text>
                    </View>
                    {items.map((item, idx) => (
                        <View key={idx} style={{...styles.tableRow}}>
                            <Text style={styles.tableCell}>{item.description}</Text>
                            <Text style={styles.tableCellRight}>${item.price.toFixed(2)}</Text>
                            <Text style={styles.tableCellRight}>{item.quantity}</Text>
                            <Text style={styles.tableCellRight}>${item.amount.toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={{...styles.tableSum, borderTopWidth: 0.5, 
        borderTopColor: "#ccc",}}>
                        <Text style={{ fontWeight: "bold" }} >Subtotal:</Text>
                        <Text >${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={{...styles.tableSum, paddingBottom: 5, gap: 16}}>
                        <Text style={{ fontWeight: "bold" }}>Tax:</Text>
                        <Text>${totalTax.toFixed(2)}</Text>
                    </View>
                    <View style={{...styles.tableSum, borderTopWidth: 0.5, 
        borderTopColor: "#ccc", borderBottomWidth: 0.5, 
        borderBottomColor: "#ccc", width: "120px", alignSelf: "flex-end", paddingTop: 5, paddingBottom: 5}}>
                        <Text style={{ fontWeight: "bold" }}>Total:</Text>
                        <Text style={{ fontWeight: "bold" }}>
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: "auto" }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color, marginBottom: 4 }}>
                        Thank you for the business!
                    </Text>
                    <Text style={{paddingBottom: 10}}>{footerTerms}</Text>

                    <View style={{...styles.footer, fontWeight: "bold", fontSize: 12}}>
                        <Text>+01234345</Text>
                        <Text>support@example.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
