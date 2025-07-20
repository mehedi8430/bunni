import { images } from "@/lib/imageProvider";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// Dynamic style function
const createStyles = (props: { titleColor?: string }) =>
  StyleSheet.create({
    document: {
      flexDirection: "column",
      fontSize: 12,
      color: props.titleColor,
    },
    page: {
      flexDirection: "column",
      fontSize: 12,
      color: props.titleColor,
      height: "100%",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    container: {
      maxWidth: "80%",
      width: "100%",
      margin: "0 auto",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
      width: 200,
      height: 100,
      objectFit: "contain",
      alignSelf: "center",
    },
    title: {
      fontSize: "60px",
      textAlign: "center",
      marginBottom: 20,
      fontWeight: 800,
      color: props.titleColor || "#000", // use prop here
    },
    date: {
      backgroundColor: "#DDDDDD",
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-evenly",
    },
    // ...other styles
  });

type BillToFrom = {
  name: string;
  address: string;
  phone: string;
};

type PaymentDetails = {
  accountType: string;
  accountNumber: string;
  paymentMethod: string;
  bankName: string;
};

interface PreviewTemplateProps {
  titleColor?: string;
  invoiceNumber?: string;
  date?: string;
  billTo?: BillToFrom;
  billFrom?: BillToFrom;
  paymentDetails?: PaymentDetails;
  subTotal?: number;
  tax?: number; // Optional tax amount
  total?: number; // Total amount after tax
  // Optional payment details
}

export default function InvoiceTemplate({
  titleColor = "#38988A",
  invoiceNumber = "123344",
  date = "12/12/24",
  billTo = {
    name: "John Doe",
    address: "123 Main St\nCity, State, Zip",
    phone: "555-1234",
  },
  billFrom = {
    name: "Jane Smith",
    address: "456 Elm St\nCity, State, Zip",
    phone: "555-5678",
  },
  paymentDetails = {
    accountType: "Bank Acc",
    accountNumber: "123456789",
    paymentMethod: "Bank",
    bankName: "Bank name",
  },
  subTotal = 1000,
  tax = 10, // Optional tax amount
  total = 1010, // Total amount after tax
}: PreviewTemplateProps) {
  const styles = createStyles({ titleColor });

  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.section}>
          <Image style={styles.image} src={images.templateLogo} />
          <Text style={styles.title}>INVOICE</Text>
        </View>

        {/* Date and invoice number */}
        <View style={styles.date}>
          <View
            style={{
              ...styles.container,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ textTransform: "uppercase" }}>
              Invoice n° {invoiceNumber}
            </Text>
            <Text style={{ textTransform: "uppercase" }}>Date: {date}</Text>
          </View>
        </View>

        {/* Payment details */}
        <View
          style={{
            ...styles.container,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Bill To
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                {billTo.name}
              </Text>
              <Text style={{ fontSize: 12 }}>{billTo.address}</Text>
              <Text style={{ fontSize: 12 }}>{billTo.phone}</Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Bill From
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                {billFrom.name}
              </Text>
              <Text style={{ fontSize: 12 }}>{billFrom.address}</Text>
              <Text style={{ fontSize: 12 }}>{billFrom.phone}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  marginBottom: 5,
                }}
              >
                Payment
              </Text>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                Paid by
              </Text>
              <Text style={{ fontSize: 12 }}>{paymentDetails.accountType}</Text>
              <Text style={{ fontSize: 12 }}>
                {paymentDetails.accountNumber}
              </Text>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 12,
                  textTransform: "uppercase",
                }}
              >
                {paymentDetails.paymentMethod}
              </Text>
              <Text style={{ fontSize: 12 }}>{paymentDetails.bankName}</Text>
            </View>
          </View>
        </View>

        {/* Table */}
        <View
          style={{
            ...styles.container,
            backgroundColor: titleColor,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            color: "#fff",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Item
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Price
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Qty.
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Total
          </Text>
        </View>
        {Array.from({ length: 5 }).map((_, index) => (
          <View
            key={index}
            style={{
              ...styles.container,
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              backgroundColor: index % 2 === 0 ? "#fff" : "#f0f0f0",
            }}
          >
            <Text>1</Text>
            <Text>Service</Text>
            <Text>$100</Text>
            <Text>2</Text>
            <Text>$200</Text>
          </View>
        ))}

        {/* Sub Total */}
        <View
          style={{
            ...styles.container,
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <View
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              justifyContent: "flex-end",
              maxWidth: "150px",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Subtotal:
              </Text>
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                ${subTotal}
              </Text>
            </View>
          </View>
        </View>

        {/* Tax */}
        <View
          style={{
            ...styles.container,
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <View
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              justifyContent: "flex-end",
              maxWidth: "150px",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                ${tax}
              </Text>
            </View>
          </View>
        </View>

        {/* Total */}
        <View
          style={{
            ...styles.container,
            flexDirection: "row",
            justifyContent: "flex-end",
            padding: 10,
          }}
        >
          <View
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              justifyContent: "flex-end",
              maxWidth: "150px",
              backgroundColor: titleColor,
              color: "#fff",
              padding: 8,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                ${total}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View
          style={{
            ...styles.container,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, color: titleColor, fontWeight: "bold" }}>
            Thank you!
          </Text>
          <Text style={{ fontSize: 12, marginTop: 10, paddingBottom: 20 }}>
            The origin of the first constellation data back to prehistoric times
            purpose was to tell stories of their beliefs, experiences, Creation,
            or mythology.
          </Text>
        </View>

        <View
          style={{
            backgroundColor: titleColor,
          }}
        >
          <View
            style={{
              ...styles.container,
              paddingVertical: 10,
              flexDirection: "row",
              color: "#fff",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              +01234345
            </Text>
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              support@example.com
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
