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
        marginBottom: 20,
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginBottom: 20,
        paddingVertical: 10,
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
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 20,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#f0f0f0",
        padding: 8,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#eee",
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
        borderTopWidth: 1,
        borderColor: "#ccc",
        paddingTop: 10,
        fontSize: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
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
        address: "456 Elm St\nCity, State, Zip",
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
                    <View style={styles.sectionBlock}>
                        <Text style={styles.label}>Issued</Text>
                        <Text>{invoiceDate}</Text>
                        <Text style={styles.label}>Due</Text>
                        <Text>{dueDate}</Text>
                    </View>
                    <View style={styles.sectionBlock}>
                        <Text style={styles.label}>Bill To</Text>
                        <Text>{billTo.name}</Text>
                        <Text>{billTo.phone}</Text>
                        <Text>{billTo.address}</Text>
                    </View>
                    <View style={styles.sectionBlock}>
                        <Text style={styles.label}>From</Text>
                        <Text>{billFrom.name}</Text>
                        <Text>{billFrom.phone}</Text>
                        <Text>{billFrom.address}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableCell}>Service</Text>
                        <Text style={styles.tableCellRight}>Price</Text>
                        <Text style={styles.tableCellRight}>Qty.</Text>
                        <Text style={styles.tableCellRight}>Line total</Text>
                    </View>
                    {items.map((item, idx) => (
                        <View key={idx} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.description}</Text>
                            <Text style={styles.tableCellRight}>${item.price.toFixed(2)}</Text>
                            <Text style={styles.tableCellRight}>{item.quantity}</Text>
                            <Text style={styles.tableCellRight}>${item.amount.toFixed(2)}</Text>
                        </View>
                    ))}
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Subtotal</Text>
                        <Text style={styles.tableCellRight}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Tax</Text>
                        <Text style={styles.tableCellRight}>${totalTax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>Total</Text>
                        <Text style={{ ...styles.tableCellRight, fontWeight: "bold" }}>
                            ${total.toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: "auto" }}>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color, marginBottom: 4 }}>
                        Thank you for the business!
                    </Text>
                    <Text>{footerTerms}</Text>

                    <View style={styles.footer}>
                        <Text>+01234345</Text>
                        <Text>support@example.com</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
