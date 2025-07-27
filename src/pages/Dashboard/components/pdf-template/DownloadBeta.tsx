import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { images } from "@/lib/imageProvider";
import type { InvoiceTemplateProps } from "@/types/download.invoice.type";

const styles = StyleSheet.create({
  document: {
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#222",
    backgroundColor: "#fff",
  },
  page: {
    padding: 24,
    backgroundColor: "#fff",
  },
  pillRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  sectionBlock: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 12,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
  },
  text: {
    fontSize: 10,
    marginBottom: 2,
  },
  table: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeader: {
    backgroundColor: "#38988A",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  footerRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F4F6", 
    padding: 10,
    borderRadius: 20,
    marginTop: 16,
  },
  logo: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
});

export default function DownloadBeta({ invoice }: InvoiceTemplateProps) {
  const {
    color = "#38988A",
    invoiceNumber,
    invoiceDate,
    dueDate,
    billTo,
    footerTerms,
    items,
    subtotal,
    totalTax,
    total,
    paymentDetails,
  } = invoice;

  const billFrom = {
    name: "Jane Smith",
    address: "456 Elm St\nCity, State, Zip",
    phone: "555-5678",
  };

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {/* Invoice Header Row */}
        <View style={[styles.pillRow]}>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            Invoice {invoiceNumber}
          </Text>
          <Text style={{ fontSize: 10 }}>Date: {invoiceDate}</Text>
        </View>

        {/* Bill To / Bill From */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionBlock}>
            <Text style={styles.label}>To</Text>
            <Text style={styles.text}>{billTo.name}</Text>
            <Text style={styles.text}>{billTo.address}</Text>
            <Text style={styles.text}>{billTo.phone}</Text>
          </View>
          <View style={styles.sectionBlock}>
            <Text style={styles.label}>From</Text>
            <Text style={styles.text}>{billFrom.name}</Text>
            <Text style={styles.text}>{billFrom.address}</Text>
            <Text style={styles.text}>{billFrom.phone}</Text>
          </View>
        </View>

        {/* Due Date */}
        <View style={[styles.pillRow]}>
          <Text style={{ fontSize: 10 }}>Due Date: {dueDate}</Text>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { flex: 3 }]}>Service</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Qty.</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Rate</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>Line total</Text>
          </View>
          {items.map((item, idx) => (
            <View
              key={idx}
              style={{
                ...styles.tableRow,
                // backgroundColor: idx % 2 === 0 ? "#fff" : "#F3F4F6",
              }}
            >
              <Text style={[styles.tableCell, { flex: 3 }]}>
                {item.description}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {item.quantity.toString().padStart(2, "0")}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>${item.price.toFixed(2)}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 5, textAlign: "right" }]}>Subtotal:</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 5, textAlign: "right" }]}>Tax:</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>${totalTax.toFixed(2)}</Text>
          </View>
          <View style={[styles.tableRow, { backgroundColor: color, color: "#fff" }]}>
            <Text style={[styles.tableCell, { flex: 5, textAlign: "right", fontWeight: "bold" }]}>Total:</Text>
            <Text style={[styles.tableCell, { flex: 1, fontWeight: "bold" }]}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Terms and Payment Details */}
        <View style={styles.sectionRow}>
          <View style={styles.sectionBlock}>
            <Text style={{ ...styles.label, color }}>Thank you for the business!</Text>
            <Text style={styles.text}>{footerTerms}</Text>
          </View>
          <View style={styles.sectionBlock}>
            <Text style={styles.label}>Payment Details</Text>
            <Text style={styles.text}>Bank: {paymentDetails.bankName}</Text>
            <Text style={styles.text}>Type: {paymentDetails.accountType}</Text>
            <Text style={styles.text}>Acc #: {paymentDetails.accountNumber}</Text>
          </View>
        </View>

        {/* Footer Row */}
        <View style={styles.footerRow}>
          <Image src={images.templateLogo} style={styles.logo} />
          <View style={{ flexDirection: "row", gap: 8}}>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>+01234345</Text>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>support@example.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
