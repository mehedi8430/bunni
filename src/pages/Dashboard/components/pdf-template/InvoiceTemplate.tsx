import { images } from "@/lib/imageProvider";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  document: {
    fontSize: 12,
    color: "#222",
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },
  page: {
    padding: 32,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  logo: {
    width: 200,
    height: 100,
    objectFit: "contain",
    marginBottom: 8,
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#38988A",
    marginBottom: 8,
    letterSpacing: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E5E7EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 16,
  },
  sectionBlock: {
    flex: 1,
    paddingRight: 8,
  },
  sectionBlockRight: {
    flex: 1,
    alignItems: "flex-end",
    paddingLeft: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
    color: "#38988A",
  },
  value: {
    fontSize: 10,
    marginBottom: 2,
    fontWeight: 500,
  },
  table: {
    width: "100%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#38988A",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
  },
  tableCell: {
    flex: 1,
    paddingHorizontal: 4,
  },
  tableCellRight: {
    flex: 1,
    textAlign: "right",
    paddingHorizontal: 4,
  },
  tableFooterRow: {
    flexDirection: "row",
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 4,
    backgroundColor: "#F3F4F6",
  },
  tableFooterCell: {
    flex: 4,
    textAlign: "right",
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
  tableFooterValue: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
  totalRow: {
    flexDirection: "row",
    fontSize: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "#38988A",
    color: "#fff",
  },
  totalLabel: {
    flex: 4,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 4,
  },
  totalValue: {
    flex: 1,
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 4,
  },
  thankYou: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#38988A",
    marginTop: 32,
    marginBottom: 8,
  },
  footerNote: {
    fontSize: 10,
    marginBottom: 16,
    color: "#444",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#38988A",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: "bold",
  },
});

type InvoiceTemplateProps = {
  invoice: {
    color?: string;
    footerTerms?: string;
    invoiceNumber: string;
    invoiceDate: string;
    billTo: {
      name: string;
      address: string;
      phone: string;
    };
    paymentDetails: {
      accountType: string;
      accountNumber: string;
      paymentMethod: string;
      bankName: string;
    };
    items: {
      description: string;
      price: number;
      quantity: number;
      amount: number;
    }[];
    subtotal: number;
    totalTax: number;
    total: number;
  };
};

export default function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
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
  } = invoice;

  const billFrom = {
    name: "Jane Smith",
    address: "456 Elm St\nCity, State, Zip",
    phone: "555-5678",
  };

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={images.templateLogo} />
          <Text style={{ ...styles.invoiceTitle, color: color || "#38988A" }}>
            INVOICE
          </Text>
        </View>

        {/* Invoice Info */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Invoice n° {invoiceNumber}</Text>
          <Text style={styles.infoText}>Date: {invoiceDate}</Text>
        </View>

        {/* Parties & Payment */}
        <View style={styles.section}>
          <View style={styles.sectionBlock}>
            <Text style={styles.label}>Bill To</Text>
            <Text style={styles.value}>{billTo.name}</Text>
            <Text style={styles.value}>{billTo.address}</Text>
            <Text style={styles.value}>{billTo.phone}</Text>
          </View>
          <View style={styles.sectionBlock}>
            <Text style={styles.label}>Bill From</Text>
            <Text style={styles.value}>{billFrom.name}</Text>
            <Text style={styles.value}>{billFrom.address}</Text>
            <Text style={styles.value}>{billFrom.phone}</Text>
          </View>
          <View style={styles.sectionBlockRight}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>Paid by</Text>
            <Text style={styles.value}>{paymentDetails.accountType}</Text>
            <Text style={styles.value}>{paymentDetails.accountNumber}</Text>
            <Text style={styles.value}>{paymentDetails.paymentMethod}</Text>
            <Text style={styles.value}>{paymentDetails.bankName}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.7 }]}>Item</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Price</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Qty.</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Total</Text>
          </View>
          {items.map((item, idx) => (
            <View
              key={idx}
              style={[
                styles.tableRow,
                { backgroundColor: idx % 2 === 0 ? "#fff" : "#F3F4F6" },
              ]}
            >
              <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {item.description}
              </Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                ${item.price.toFixed(2)}
              </Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                {item.quantity}
              </Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                ${item.amount.toFixed(2)}
              </Text>
            </View>
          ))}
          {/* Table Footer */}
          <View style={styles.tableFooterRow}>
            <Text style={styles.tableFooterCell}>Subtotal:</Text>
            <Text style={styles.tableFooterValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.tableFooterRow}>
            <Text style={styles.tableFooterCell}>Tax:</Text>
            <Text style={styles.tableFooterValue}>${totalTax.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Thank You & Footer */}
        <Text style={styles.thankYou}>Thank you!</Text>
        <Text style={styles.footerNote}>{footerTerms}</Text>
        <View style={styles.footer}>
          <Text>+01234345</Text>
          <Text>support@example.com</Text>
        </View>
      </Page>
    </Document>
  );
}
