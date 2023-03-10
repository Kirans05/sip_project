export default async function handler(req, res) {
  let options = req.body;
  try {
    let response = await getServerSideProps({ query: options });
    res.status(200).json({ name: "success", response });
  } catch (err) {
    res.status(400).json({ name: "error_h", err });
  }
}

export async function getServerSideProps(context) {
  let options = context.query;
  try {
    // let response = await fetch(options)
    // response = await response.json()
    res.status(200).json({ name: "success", response: context });
  } catch (err) {
    res.status(400).json({ name: "error_s", err });
  }
}
